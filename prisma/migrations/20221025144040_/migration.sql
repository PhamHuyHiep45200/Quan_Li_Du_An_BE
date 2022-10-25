-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_id_project_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_id_group_fkey";

-- AlterTable
ALTER TABLE "Group" ALTER COLUMN "id_project" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "id_group" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
