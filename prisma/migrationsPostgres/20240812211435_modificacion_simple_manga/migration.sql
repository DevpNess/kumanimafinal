/*
  Warnings:

  - You are about to drop the column `banner` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `dayViews` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `favorite` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `monthViews` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `pathChapters` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `ranking` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `scan` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `weekViews` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `rating1` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating2` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating3` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating4` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating5` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesAnime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `likesAnime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seeLaterAnime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresManga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresOnAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresOnManga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KumanimaEn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KumanimaEs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ranting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusManga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TotalTopViews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeManga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dayViews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monthViews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weekViews` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coverImage` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genreId` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ONGOING', 'COMPLETED', 'HIATUS');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnAnime" DROP CONSTRAINT "GenresOnAnime_animeId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnAnime" DROP CONSTRAINT "GenresOnAnime_genreId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnManga" DROP CONSTRAINT "GenresOnManga_genreId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnManga" DROP CONSTRAINT "GenresOnManga_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_typeId_fkey";

-- DropIndex
DROP INDEX "Manga_id_key";

-- AlterTable
CREATE SEQUENCE author_id_seq;
ALTER TABLE "Author" ALTER COLUMN "id" SET DEFAULT nextval('author_id_seq');
ALTER SEQUENCE author_id_seq OWNED BY "Author"."id";

-- AlterTable
ALTER TABLE "Manga" DROP COLUMN "banner",
DROP COLUMN "dayViews",
DROP COLUMN "favorite",
DROP COLUMN "monthViews",
DROP COLUMN "pathChapters",
DROP COLUMN "ranking",
DROP COLUMN "scan",
DROP COLUMN "statusId",
DROP COLUMN "typeId",
DROP COLUMN "weekViews",
ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "favorites" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "genreId" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "updateLast" DROP NOT NULL,
ALTER COLUMN "updateNext" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "rating1",
DROP COLUMN "rating2",
DROP COLUMN "rating3",
DROP COLUMN "rating4",
DROP COLUMN "rating5",
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoritesAnime",
DROP COLUMN "likesAnime",
DROP COLUMN "seeLaterAnime",
ALTER COLUMN "likesManga" SET DEFAULT 0,
ALTER COLUMN "seeLaterManga" SET DEFAULT 0,
ALTER COLUMN "favoritesManga" SET DEFAULT 0;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Anime";

-- DropTable
DROP TABLE "Authenticator";

-- DropTable
DROP TABLE "GenresAnime";

-- DropTable
DROP TABLE "GenresManga";

-- DropTable
DROP TABLE "GenresOnAnime";

-- DropTable
DROP TABLE "GenresOnManga";

-- DropTable
DROP TABLE "KumanimaEn";

-- DropTable
DROP TABLE "KumanimaEs";

-- DropTable
DROP TABLE "Ranting";

-- DropTable
DROP TABLE "StatusAnime";

-- DropTable
DROP TABLE "StatusManga";

-- DropTable
DROP TABLE "Studio";

-- DropTable
DROP TABLE "TotalTopViews";

-- DropTable
DROP TABLE "TypeAnime";

-- DropTable
DROP TABLE "TypeManga";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "dayViews";

-- DropTable
DROP TABLE "monthViews";

-- DropTable
DROP TABLE "weekViews";

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
