-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "deleteFlg" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "deleteFlg" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deleteFlg" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "deleteFlg" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserGroup" ADD COLUMN     "deleteFlg" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserItem" ADD COLUMN     "deleteFlg" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UserTask" ADD COLUMN     "deleteFlg" BOOLEAN NOT NULL DEFAULT false;
