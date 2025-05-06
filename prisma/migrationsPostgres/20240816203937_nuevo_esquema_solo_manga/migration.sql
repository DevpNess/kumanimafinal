/*
  Warnings:

  - You are about to drop the column `chapters` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `favorite` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `pathChapters` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `ranking` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `seeLater` on the `Manga` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `StatusManga` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `TypeManga` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesAnime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesManga` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `likesAnime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `likesManga` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seeLaterAnime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `seeLaterManga` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Anime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresManga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresOnAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenresOnManga` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KumanimaEn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KumanimaEs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ranting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatusAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Studio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TotalTopViews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypeAnime` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dayViews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `monthViews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weekViews` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[path]` on the table `Manga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `StatusManga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TypeManga` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path` to the `Manga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `StatusManga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TypeManga` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_studioId_fkey";

-- DropForeignKey
ALTER TABLE "Anime" DROP CONSTRAINT "Anime_typeId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnAnime" DROP CONSTRAINT "GenresOnAnime_animeId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnAnime" DROP CONSTRAINT "GenresOnAnime_genreId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnManga" DROP CONSTRAINT "GenresOnManga_genreId_fkey";

-- DropForeignKey
ALTER TABLE "GenresOnManga" DROP CONSTRAINT "GenresOnManga_mangaId_fkey";

-- DropForeignKey
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_authorId_fkey";

-- DropIndex
DROP INDEX "StatusManga_text_key";

-- DropIndex
DROP INDEX "TypeManga_text_key";

-- AlterTable
ALTER TABLE "Manga" DROP COLUMN "chapters",
DROP COLUMN "favorite",
DROP COLUMN "likes",
DROP COLUMN "pathChapters",
DROP COLUMN "ranking",
DROP COLUMN "rating",
DROP COLUMN "seeLater",
ADD COLUMN     "cap" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "favoritesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "seeLaterCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "updateNext" DROP NOT NULL,
ALTER COLUMN "banner" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StatusManga" DROP COLUMN "text",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TypeManga" DROP COLUMN "text",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "favoritesAnime",
DROP COLUMN "favoritesManga",
DROP COLUMN "likesAnime",
DROP COLUMN "likesManga",
DROP COLUMN "seeLaterAnime",
DROP COLUMN "seeLaterManga";

-- DropTable
DROP TABLE "Anime";

-- DropTable
DROP TABLE "Author";

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
DROP TABLE "Rating";

-- DropTable
DROP TABLE "StatusAnime";

-- DropTable
DROP TABLE "Studio";

-- DropTable
DROP TABLE "TotalTopViews";

-- DropTable
DROP TABLE "TypeAnime";

-- DropTable
DROP TABLE "dayViews";

-- DropTable
DROP TABLE "monthViews";

-- DropTable
DROP TABLE "weekViews";

-- CreateTable
CREATE TABLE "AuthorManga" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AuthorManga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanManga" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ScanManga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenreManga" (
    "mangaId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "GenreManga_pkey" PRIMARY KEY ("mangaId","genreId")
);

-- CreateTable
CREATE TABLE "RatingManga" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RatingManga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MangaLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,

    CONSTRAINT "MangaLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MangaSeeLater" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,

    CONSTRAINT "MangaSeeLater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MangaFavorite" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,

    CONSTRAINT "MangaFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorManga_id_key" ON "AuthorManga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorManga_name_key" ON "AuthorManga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ScanManga_id_key" ON "ScanManga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ScanManga_name_key" ON "ScanManga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RatingManga_userId_mangaId_key" ON "RatingManga"("userId", "mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "MangaLike_userId_mangaId_key" ON "MangaLike"("userId", "mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "MangaSeeLater_userId_mangaId_key" ON "MangaSeeLater"("userId", "mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "MangaFavorite_userId_mangaId_key" ON "MangaFavorite"("userId", "mangaId");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_path_key" ON "Manga"("path");

-- CreateIndex
CREATE UNIQUE INDEX "StatusManga_name_key" ON "StatusManga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TypeManga_name_key" ON "TypeManga"("name");

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "AuthorManga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_scan_fkey" FOREIGN KEY ("scan") REFERENCES "ScanManga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreManga" ADD CONSTRAINT "GenreManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreManga" ADD CONSTRAINT "GenreManga_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingManga" ADD CONSTRAINT "RatingManga_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingManga" ADD CONSTRAINT "RatingManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaLike" ADD CONSTRAINT "MangaLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaLike" ADD CONSTRAINT "MangaLike_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaSeeLater" ADD CONSTRAINT "MangaSeeLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaSeeLater" ADD CONSTRAINT "MangaSeeLater_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaFavorite" ADD CONSTRAINT "MangaFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MangaFavorite" ADD CONSTRAINT "MangaFavorite_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
