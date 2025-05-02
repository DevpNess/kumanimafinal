-- CreateTable
CREATE TABLE "MangaScraping" (
    "id" SERIAL NOT NULL,
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
    "SelectorImageChapter" TEXT NOT NULL,

    CONSTRAINT "MangaScraping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MangaScraping_id_key" ON "MangaScraping"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MangaScraping_name_key" ON "MangaScraping"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MangaScraping_domain_key" ON "MangaScraping"("domain");
