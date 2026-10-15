-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "surName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "lineId" TEXT,
    "currentLocation" TEXT NOT NULL,
    "highestEducation" TEXT NOT NULL,
    "preferSubjects" TEXT NOT NULL,
    "idCardPath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");
