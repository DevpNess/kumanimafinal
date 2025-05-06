/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `GenresAnime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `GenresManga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `KumanimaEn` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `KumanimaEs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Manga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `StatusAnime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `StatusManga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `TypeAnime` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `TypeManga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nickName]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Anime_title_key" ON "Anime"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GenresAnime_name_key" ON "GenresAnime"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GenresManga_name_key" ON "GenresManga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEn_title_key" ON "KumanimaEn"("title");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEs_title_key" ON "KumanimaEs"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_title_key" ON "Manga"("title");

-- CreateIndex
CREATE UNIQUE INDEX "StatusAnime_text_key" ON "StatusAnime"("text");

-- CreateIndex
CREATE UNIQUE INDEX "StatusManga_text_key" ON "StatusManga"("text");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAnime_text_key" ON "TypeAnime"("text");

-- CreateIndex
CREATE UNIQUE INDEX "TypeManga_text_key" ON "TypeManga"("text");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nickName_key" ON "Users"("nickName");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
