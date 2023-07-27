/*
  Warnings:

  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropTable
DROP TABLE "Ingredients";

-- DropTable
DROP TABLE "Posts";

-- DropTable
DROP TABLE "Recipe";

-- CreateTable
CREATE TABLE "Thoughts" (
    "id" SERIAL NOT NULL,
    "post" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Thoughts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thoughts" ADD CONSTRAINT "Thoughts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
