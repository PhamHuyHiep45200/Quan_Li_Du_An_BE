-- DropForeignKey
ALTER TABLE "UserTask" DROP CONSTRAINT "UserTask_userManager_fkey";

-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "id_taskParent" INTEGER;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_id_taskParent_fkey" FOREIGN KEY ("id_taskParent") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
