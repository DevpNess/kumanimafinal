-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "avatar" DROP NOT NULL,
ALTER COLUMN "likesManga" DROP NOT NULL,
ALTER COLUMN "seeLaterManga" DROP NOT NULL,
ALTER COLUMN "favoritesManga" DROP NOT NULL,
ALTER COLUMN "likesAnime" DROP NOT NULL,
ALTER COLUMN "seeLaterAnime" DROP NOT NULL,
ALTER COLUMN "favoritesAnime" DROP NOT NULL;
