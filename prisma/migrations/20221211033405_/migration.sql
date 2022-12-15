/*
  Warnings:

  - Added the required column `endDate` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "descriptions" TEXT,
    "status" "StatusTask",
    "start_Time" TEXT,
    "end_Time" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taskHistory" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_taskHistory_fkey" FOREIGN KEY ("taskHistory") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
