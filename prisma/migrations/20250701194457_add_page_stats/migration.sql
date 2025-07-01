-- CreateTable
CREATE TABLE "PageStats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "totalRevenue" REAL NOT NULL,
    "newCustomers" INTEGER NOT NULL,
    "activeAccounts" INTEGER NOT NULL,
    "growthRate" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PageStats_date_key" ON "PageStats"("date");
