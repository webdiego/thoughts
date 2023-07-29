-- DropForeignKey
ALTER TABLE "Thoughts" DROP CONSTRAINT "Thoughts_userId_fkey";

-- AddForeignKey
ALTER TABLE "Thoughts" ADD CONSTRAINT "Thoughts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
