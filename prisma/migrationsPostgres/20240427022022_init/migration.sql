-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "likesManga" INTEGER NOT NULL,
    "seeLaterManga" INTEGER NOT NULL,
    "favoritesManga" INTEGER NOT NULL,
    "likesAnime" INTEGER NOT NULL,
    "seeLaterAnime" INTEGER NOT NULL,
    "favoritesAnime" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Manga" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "chapters" INTEGER NOT NULL DEFAULT 0,
    "pathChapters" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "scan" INTEGER NOT NULL,
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

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "mangaId" INTEGER NOT NULL,
    "rating1" INTEGER NOT NULL DEFAULT 0,
    "rating2" INTEGER NOT NULL DEFAULT 0,
    "rating3" INTEGER NOT NULL DEFAULT 0,
    "rating4" INTEGER NOT NULL DEFAULT 0,
    "rating5" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranting" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Ranting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEs_id_key" ON "KumanimaEs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KumanimaEn_id_key" ON "KumanimaEn"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_id_key" ON "Manga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Anime_id_key" ON "Anime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StatusManga_id_key" ON "StatusManga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StatusAnime_id_key" ON "StatusAnime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeAnime_id_key" ON "TypeAnime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeManga_id_key" ON "TypeManga"("id");

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

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusManga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeManga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manga" ADD CONSTRAINT "Manga_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
