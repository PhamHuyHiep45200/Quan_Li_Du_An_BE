/*
  Warnings:

  - A unique constraint covering the columns `[taskParent]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_taskParent_key" ON "Task"("taskParent");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskParent_fkey" FOREIGN KEY ("taskParent") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
