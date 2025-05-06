-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avatar" TEXT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("provider", "providerAccountId"),
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,

    PRIMARY KEY ("identifier", "token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,
    CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Manga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "cap" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "scan" INTEGER NOT NULL,
    "banner" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "dayViews" INTEGER NOT NULL DEFAULT 0,
    "weekViews" INTEGER NOT NULL DEFAULT 0,
    "monthViews" INTEGER NOT NULL DEFAULT 0,
    "likesCount" INTEGER NOT NULL DEFAULT 0,
    "favoritesCount" INTEGER NOT NULL DEFAULT 0,
    "seeLaterCount" INTEGER NOT NULL DEFAULT 0,
    "releaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateLast" DATETIME NOT NULL,
    "updateNext" DATETIME,
    CONSTRAINT "Manga_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusManga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manga_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeManga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manga_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "AuthorManga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Manga_scan_fkey" FOREIGN KEY ("scan") REFERENCES "ScanManga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StatusManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TypeManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AuthorManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ScanManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GenreManga" (
    "mangaId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("mangaId", "genreId"),
    CONSTRAINT "GenreManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GenreManga_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RatingManga" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "RatingManga_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RatingManga_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MangaLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,
    CONSTRAINT "MangaLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MangaLike_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MangaSeeLater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,
    CONSTRAINT "MangaSeeLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MangaSeeLater_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MangaFavorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,
    CONSTRAINT "MangaFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MangaFavorite_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MangaScraping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "SelectorName" TEXT NOT NULL,
    "SelectorDescription" TEXT NOT NULL,
    "SelectorStatus" TEXT NOT NULL,
    "SelectorType" TEXT NOT NULL,
    "SelectorAuthor" TEXT NOT NULL,
    "SelectorScan" TEXT NOT NULL,
    "SelectorGenres" TEXT NOT NULL,
    "SelectorBanner" TEXT NOT NULL,
    "SelectorNumberChapters" TEXT NOT NULL,
    "SelectorImageChapter" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_id_key" ON "Manga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_path_key" ON "Manga"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Manga_title_key" ON "Manga"("title");

-- CreateIndex
CREATE UNIQUE INDEX "StatusManga_id_key" ON "StatusManga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StatusManga_name_key" ON "StatusManga"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TypeManga_id_key" ON "TypeManga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TypeManga_name_key" ON "TypeManga"("name");

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
CREATE UNIQUE INDEX "MangaScraping_id_key" ON "MangaScraping"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MangaScraping_name_key" ON "MangaScraping"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MangaScraping_domain_key" ON "MangaScraping"("domain");
