-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_personCreate_fkey" FOREIGN KEY ("personCreate") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_personCreate_fkey" FOREIGN KEY ("personCreate") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_personCreate_fkey" FOREIGN KEY ("personCreate") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
