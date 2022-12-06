/*
  Warnings:

  - You are about to drop the column `userManager` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userManager";

-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "userManager" INTEGER;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_userManager_fkey" FOREIGN KEY ("userManager") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
