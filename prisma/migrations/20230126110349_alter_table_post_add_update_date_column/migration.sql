-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "description" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "update_date" TIMESTAMP(3);
