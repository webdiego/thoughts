/*
  Warnings:

  - You are about to drop the column `email` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "email",
DROP COLUMN "name";
