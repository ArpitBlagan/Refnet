/*
  Warnings:

  - You are about to drop the column `photos` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "photos",
DROP COLUMN "video",
ADD COLUMN     "media" TEXT[] DEFAULT ARRAY[]::TEXT[];
