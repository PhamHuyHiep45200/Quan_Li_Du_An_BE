/*
  Warnings:

  - Added the required column `content` to the `CommentTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentTask" ADD COLUMN     "content" TEXT NOT NULL;
