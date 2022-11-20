-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskParent_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskParent_fkey" FOREIGN KEY ("taskParent") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
