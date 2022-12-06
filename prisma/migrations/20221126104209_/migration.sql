/*
  Warnings:

  - You are about to drop the column `id_taskParent` on the `UserTask` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_id_taskParent_fkey";

-- AlterTable
ALTER TABLE "UserTask" DROP COLUMN "id_taskParent",
ADD COLUMN     "id_taskManager" INTEGER;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_id_taskManager_fkey" FOREIGN KEY ("id_taskManager") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
