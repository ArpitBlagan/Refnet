/*
  Warnings:

  - A unique constraint covering the columns `[followerId,followingId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follower_followerId_followingId_key" ON "Follower"("followerId", "followingId");
