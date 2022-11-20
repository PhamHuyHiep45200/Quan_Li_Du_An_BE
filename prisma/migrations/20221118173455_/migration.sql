/*
  Warnings:

  - You are about to drop the column `taskParent` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskParent_fkey";

-- DropIndex
DROP INDEX "Task_taskParent_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "taskParent",
ADD COLUMN     "taskParentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskParentId_fkey" FOREIGN KEY ("taskParentId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
