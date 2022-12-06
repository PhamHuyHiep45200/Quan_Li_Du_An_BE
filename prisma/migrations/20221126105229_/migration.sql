-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
