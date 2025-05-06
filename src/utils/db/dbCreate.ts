import prisma from "@/lib/prisma"
import { User, Account, Manga, StatusManga, TypeManga, AuthorManga, ScanManga, Genre, GenreManga, RatingManga, MangaLike, MangaSeeLater, MangaFavorite, MangaScraping } from "@prisma/client"

// =============================================
// USERS
// =============================================

/**
 * Crea un nuevo usuario en la base de datos
 * @param data Datos del usuario a crear
 * @returns Promise<User> Usuario creado
 */
export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await prisma.user.create({ data })
}

// =============================================
// ACCOUNTS
// =============================================

/**
 * Crea una nueva cuenta
 * @param data Datos de la cuenta a crear
 * @returns Promise<Account> Cuenta creada
 */
export async function createAccount(data: Omit<Account, 'createdAt' | 'updatedAt'>): Promise<Account> {
    return await prisma.account.create({ data })
}

// =============================================
// MANGA
// =============================================

/**
 * Crea un nuevo manga
 * @param data Datos del manga a crear
 * @returns Promise<Manga> Manga creado
 */
export async function createManga(data: Omit<Manga, 'id' | 'createdAt' | 'updatedAt'>): Promise<Manga> {
    return await prisma.manga.create({ data })
}

// =============================================
// STATUS MANGA
// =============================================

/**
 * Crea un nuevo estado de manga
 * @param data Datos del estado a crear
 * @returns Promise<StatusManga> Estado creado
 */
export async function createStatusManga(data: Omit<StatusManga, 'id'>): Promise<StatusManga> {
    return await prisma.statusManga.create({ data })
}

// =============================================
// TYPE MANGA
// =============================================

/**
 * Crea un nuevo tipo de manga
 * @param data Datos del tipo a crear
 * @returns Promise<TypeManga> Tipo creado
 */
export async function createTypeManga(data: Omit<TypeManga, 'id'>): Promise<TypeManga> {
    return await prisma.typeManga.create({ data })
}

// =============================================
// AUTHOR MANGA
// =============================================

/**
 * Crea un nuevo autor de manga
 * @param data Datos del autor a crear
 * @returns Promise<AuthorManga> Autor creado
 */
export async function createAuthorManga(data: Omit<AuthorManga, 'id'>): Promise<AuthorManga> {
    return await prisma.authorManga.create({ data })
}

// =============================================
// SCAN MANGA
// =============================================

/**
 * Crea un nuevo scan de manga
 * @param data Datos del scan a crear
 * @returns Promise<ScanManga> Scan creado
 */
export async function createScanManga(data: Omit<ScanManga, 'id'>): Promise<ScanManga> {
    return await prisma.scanManga.create({ data })
}

// =============================================
// GENRE
// =============================================

/**
 * Crea un nuevo género
 * @param data Datos del género a crear
 * @returns Promise<Genre> Género creado
 */
export async function createGenre(data: Omit<Genre, 'id'>): Promise<Genre> {
    return await prisma.genre.create({ data })
}

// =============================================
// GENRE MANGA
// =============================================

/**
 * Crea una nueva relación entre manga y género
 * @param data Datos de la relación a crear
 * @returns Promise<GenreManga> Relación creada
 */
export async function createGenreManga(data: Omit<GenreManga, 'id'>): Promise<GenreManga> {
    return await prisma.genreManga.create({ data })
}

// =============================================
// RATING MANGA
// =============================================

/**
 * Crea una nueva calificación de manga
 * @param data Datos de la calificación a crear
 * @returns Promise<RatingManga> Calificación creada
 */
export async function createRatingManga(data: Omit<RatingManga, 'id'>): Promise<RatingManga> {
    return await prisma.ratingManga.create({ data })
}

// =============================================
// MANGA LIKE
// =============================================

/**
 * Crea un nuevo like de manga
 * @param data Datos del like a crear
 * @returns Promise<MangaLike> Like creado
 */
export async function createMangaLike(data: Omit<MangaLike, 'id'>): Promise<MangaLike> {
    return await prisma.mangaLike.create({ data })
}

// =============================================
// MANGA SEE LATER
// =============================================

/**
 * Crea un nuevo "ver después" de manga
 * @param data Datos del "ver después" a crear
 * @returns Promise<MangaSeeLater> "Ver después" creado
 */
export async function createMangaSeeLater(data: Omit<MangaSeeLater, 'id'>): Promise<MangaSeeLater> {
    return await prisma.mangaSeeLater.create({ data })
}

// =============================================
// MANGA FAVORITE
// =============================================

/**
 * Crea un nuevo favorito de manga
 * @param data Datos del favorito a crear
 * @returns Promise<MangaFavorite> Favorito creado
 */
export async function createMangaFavorite(data: Omit<MangaFavorite, 'id'>): Promise<MangaFavorite> {
    return await prisma.mangaFavorite.create({ data })
}

// =============================================
// MANGA SCRAPING
// =============================================

/**
 * Crea nuevos datos de scraping de manga
 * @param data Datos de scraping a crear
 * @returns Promise<MangaScraping> Datos de scraping creados
 */
export async function createMangaScraping(data: Omit<MangaScraping, 'id'>): Promise<MangaScraping> {
    return await prisma.mangaScraping.create({ data })
} 