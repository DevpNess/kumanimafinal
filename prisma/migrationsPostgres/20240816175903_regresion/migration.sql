/*
  Warnings:

  - You are about to drop the column `coverImage` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `favorites` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Rating` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Manga` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `banner` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favorite` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pathChapters` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ranking` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scan` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Made the column `updateLast` on table `Manga` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updateNext` on table `Manga` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_genreId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "author_id_seq";

-- AlterTable
ALTER TABLE "Manga" DROP COLUMN "coverImage",
DROP COLUMN "favorites",
DROP COLUMN "genreId",
DROP COLUMN "status",
ADD COLUMN     "banner" TEXT NOT NULL,
ADD COLUMN     "dayViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "favorite" INTEGER NOT NULL,
ADD COLUMN     "monthViews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pathChapters" TEXT NOT NULL,
ADD COLUMN     "ranking" INTEGER NOT NULL,
ADD COLUMN     "scan" INTEGER NOT NULL,
ADD COLUMN     "statusId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "weekViews" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "updateLast" SET NOT NULL,
ALTER COLUMN "updateNext" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "rating",
DROP COLUMN "userId",
ADD COLUMN     "rating1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating3" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating4" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating5" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favoritesAnime" INTEGER,
ADD COLUMN     "likesAnime" INTEGER,
ADD COLUMN     "seeLaterAnime" INTEGER,
ALTER COLUMN "likesManga" DROP DEFAULT,
ALTER COLUMN "seeLaterManga" DROP DEFAULT,
ALTER COLUMN "favoritesManga" DROP DEFAULT;

-- DropTable
DROP TABLE "Genre";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "id" TEXT NOT NULL,
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KumanimaEs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "logoLetters" TEXT NOT NULL,
    "notice" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "paypal" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "tiktok" TEXT NOT NULL,

    CONSTRAINT "KumanimaEs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KumanimaEn" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "logoLetters" TEXT NOT NULL,
    "notice" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "paypal" TEXT NOT NULL,
    "discord" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "tiktok" TEXT NOT NULL,

    CONSTRAINT "KumanimaEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anime" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "episodes" INTEGER NOT NULL DEFAULT 0,
    "pathEpisodes" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "studioId" INTEGER NOT NULL,
    "banner" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "dayViews" INTEGER NOT NULL DEFAULT 0,
    "weekViews" INTEGER NOT NULL DEFAULT 0,
    "monthViews" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "favorite" INTEGER NOT NULL,
    "seeLater" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "ranking" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateLast" TIMESTAMP(3) NOT NULL,
    "updateNext" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusManga" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "StatusManga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusAnime" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "StatusAnime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeAnime" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TypeAnime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeManga" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TypeManga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresManga" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GenresManga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresAnime" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GenresAnime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresOnAnime" (
    "animeId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "GenresOnAnime_pkey" PRIMARY KEY ("animeId","genreId")
);

-- CreateTable
CREATE TABLE "GenresOnManga" (
    "mangaId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "GenresOnManga_pkey" PRIMARY KEY ("mangaId","genreId")
);

-- CreateTable
CREATE TABLE "dayViews" (
    "id" SERIAL NOT NULL,
    "serie" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "dayViews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekViews" (
    "id" SERIAL NOT NULL,
    "serie" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "weekViews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthViews" (
    "id" SERIAL NOT NULL,
    "serie" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "monthViews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TotalTopViews" (
    "id" SERIAL NOT NULL,
    "serie" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "TotalTopViews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranting" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Ranting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEs_id_key" ON "KumanimaEs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEs_title_key" ON "KumanimaEs"("title");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEn_id_key" ON "KumanimaEn"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEn_title_key" ON "KumanimaEn"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_id_key" ON "Anime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_title_key" ON "Anime"("title");

-- CreateIndex
CREATE UNIQUE INDEX "StatusManga_id_key" ON "StatusManga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StatusManga_text_key" ON "StatusManga"("text");

-- CreateIndex
CREATE UNIQUE INDEX "StatusAnime_id_key" ON "StatusAnime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StatusAnime_text_key" ON "StatusAnime"("text");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAnime_id_key" ON "TypeAnime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAnime_text_key" ON "TypeAnime"("text");

-- CreateIndex
CREATE UNIQUE INDEX "TypeManga_id_key" ON "TypeManga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeManga_text_key" ON "TypeManga"("text");

-- CreateIndex
CREATE UNIQUE INDEX "GenresManga_name_key" ON "GenresManga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GenresAnime_name_key" ON "GenresAnime"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dayViews_id_key" ON "dayViews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "weekViews_id_key" ON "weekViews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "monthViews_id_key" ON "monthViews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TotalTopViews_id_key" ON "TotalTopViews"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_id_key" ON "Studio"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ranting_id_key" ON "Ranting"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_id_key" ON "Manga"("id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusManga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeManga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusAnime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeAnime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anime" ADD CONSTRAINT "Anime_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnAnime" ADD CONSTRAINT "GenresOnAnime_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnAnime" ADD CONSTRAINT "GenresOnAnime_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "GenresAnime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnManga" ADD CONSTRAINT "GenresOnManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnManga" ADD CONSTRAINT "GenresOnManga_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "GenresManga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
