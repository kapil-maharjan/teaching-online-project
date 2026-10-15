# Teaching Online Project 📚✨

An interactive, full-stack educational platform designed to deliver online learning content seamlessly. This project focuses on translating complex interface designs into highly maintainable, component-based web applications, offering a robust scalable structure for both students and administrators.

## 🚀 Features

- **Interactive Learning Interface:** Clean, user-friendly dashboard for accessing courses, lessons, and multimedia educational content.
- **E-Commerce Integration:** Streamlined checkout and course enrollment system built for performance and scalability.
- **Responsive Layout:** Optimized for seamless usage across mobile, tablet, and desktop devices.
- **Component-Driven Architecture:** Highly modular front-end designed for reusability and clean state management.

## 🛠️ Tech Stack

- **Front-end:** React.js (Component-based UI, modern state management)
- **Back-end:** Node.js & Express.js (Scalable RESTful API architecture)
- **Database:** PostgreSQL (Relational data storage optimized for complex educational data schemas)

## 📁 Project Structure
```text
learning-platform/
└── src/
    ├── assets/                  # Images, branding elements, and vector graphics
    │   ├── gallery/
    │   │   └── teaching-unsplash.jpg
    │   ├── facebook-logo.svg
    │   ├── hero.png
    │   ├── line-logo.svg
    │   ├── question-circle.svg
    │   ├── react.svg
    │   ├── telephone-logo.svg
    │   ├── tool-pencil.svg
    │   ├── vite.svg
    │   ├── whatsapp-logo.svg
    │   └── your-logo.svg
    ├── components/              # Global UI elements shared across the entire application
    │   ├── Footer.css
    │   ├── Footer.jsx
    │   ├── Header.css
    │   └── Header.jsx
    ├── pages/                   # Main view layers and screen layouts
    │   ├── admin/               # Administrative views and workflows
    │   │   ├── AdminDashBoard.css
    │   │   ├── AdminDashBoard.jsx
    │   │   ├── AdminLogin.css
    │   │   └── AdminLogin.jsx
    │   └── home/                # General public-facing landing and info pages
    │       ├── HomePage.css
    │       ├── HomePage.jsx
    │       ├── AboutUs.css
    │       ├── AboutUs.jsx
    │       ├── ContactUs.css
    │       ├── ContactUs.jsx
    │       ├── TeacherSignUp.css
    │       └── TeacherSignUp.jsx
    ├── App.css                  # Main application container styling
    ├── App.jsx                  # Root component and router entry point
    └── config.js                # Environment, routing, or system-wide configurations

teaching-backend/
├── .agents/skills/          # AI agent system skill configs
├── .claude/skills/          # Claude integration profiles
├── .windsurf/skills/        # Windsurf IDE agent configurations
├── generated/prisma/        # Automatically generated Prisma client models
├── prisma/                  # Primary Prisma schema definition and migrations
├── uploads/                 # Local directory for stored files and user attachments
├── .env                     # Local environment configurations (database URLs, keys)
├── .gitignore               # Excluded file paths (ignores node_modules, secrets)
├── package-lock.json        # Strict dependency version tree lockfile
├── package.json             # App scripts, operational rules, and external libraries
├── prisma7.config.ts        # Prisma ORM pipeline configurations
├── server.js                # Core API entry point and Express service listener
└── skills-lock.json         # Lockfile specifying fixed versions for agent capabilities


```

## ⚙️ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org) (v16+ recommended)
- [PostgreSQL](https://postgresql.org) (running locally or remotely)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd teaching-online-project
   ```

2. **Set up the backend:**
   ```bash
   cd server
   npm install
   # Create a .env file and configure your PORT and database connection strings
   npm start
   ```

3. **Set up the frontend:**
   ```bash
   cd ../client
   npm install
   npm start
   ```

## 📈 Future Roadmaps

- Integration of live video streaming classes.
- Enhanced analytics dashboard for tracking student learning progress.
- Multi-language localization support.
