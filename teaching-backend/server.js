require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("./generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5000;

// 1. Setup Network Security Middlewares
// This allows your React application running on port 5173 to talk to this server
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // Allows Express to read incoming standard text JSON

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 2. Ensure an 'uploads' folder exists locally to store identity cards
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 3. Configure Multer Disk Storage Options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specifies the local storage destination folder
  },
  filename: (req, file, cb) => {
    // Generates a clean, completely unique filename using timestamp headers
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Middleware: only allow requests with a valid admin token through
function verifyAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "ไม่มีโทเค็นให้มา" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "ไม่ได้รับอนุญาต" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "โทเค็นไม่ถูกต้องหรือหมดอายุแล้ว" });
  }
}

// 4. The Teacher Sign-Up POST Endpoint
// 'idCard' must match the key name used in your frontend FormData object payload
app.post("/api/teachers/signup", upload.single("idCard"), async (req, res) => {
  try {
    // Extract text fields from req.body
    const {
      email,
      password,
      firstName,
      surName,
      dateOfBirth,
      mobileNo,
      lineId,
      currentLocation,
      highestEducation,
      preferSubjects, // Receives stringified JSON array sent via FormData
    } = req.body;

    // Extract uploaded file properties from req.file
    const fileUploaded = req.file;

    // Validation: Ensure all critical data forms are fully completed
    if (!email || !password || !firstName || !surName || !fileUploaded) {
      return res.status(400).json({
        message: "Missing required registration data or verification document.",
      });
    }

    // Check if the teacher email already exists in your database system
    const existingTeacher = await prisma.teacher.findUnique({
      where: { email: email },
    });

    if (existingTeacher) {
      // If email exists, delete the freshly uploaded file immediately to prevent system junk files
      fs.unlinkSync(fileUploaded.path);
      return res
        .status(400)
        .json({ message: "This email is already registered." });
    }

    // 5. Encrypt the Password Using Bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 6. Write to Database using Prisma ORM client structures
    const newTeacher = await prisma.teacher.create({
      data: {
        email,
        password: hashedPassword, // Stores the secure hash instead of plain text passwords
        firstName,
        surName,
        dateOfBirth,
        mobileNo,
        lineId: lineId || null,
        currentLocation,
        highestEducation,
        preferSubjects, // Stores the checklist tracking array as a string string
        idCardPath: fileUploaded.path, // Stores the string path location pointing to your local file
      },
    });

    console.log(`🎉 New teacher registered successfully: ${email}`);

    return res.status(201).json({
      message: "Registration application processed successfully!",
      teacherId: newTeacher.id,
    });
  } catch (error) {
    console.error("Registration processing error:", error);
    return res
      .status(500)
      .json({ message: "Internal server processing error." });
  }
});

// Admin Login Endpoint
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });
    }

    const validUsername = username === process.env.ADMIN_USERNAME;
    const validPassword = validUsername
      ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
      : false;

    if (!validUsername || !validPassword) {
      return res.status(401).json({ message: "ข้อมูลไม่ถูกต้อง" });
    }

    const token = jwt.sign(
      { username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2y" },
    );

    return res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ", token });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
});

// Get all teacher signups (admin only)
app.get("/api/admin/teachers", verifyAdmin, async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        firstName: true,
        surName: true,
        dateOfBirth: true,
        mobileNo: true,
        lineId: true,
        currentLocation: true,
        highestEducation: true,
        preferSubjects: true,
        idCardPath: true,
        createdAt: true,
        // password intentionally excluded — never send password hashes to the frontend
      },
    });

    return res.status(200).json({ teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return res
      .status(500)
      .json({ message: "Internal server processing error." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Teacher backend runtime active on http://localhost:${PORT}`);
});
