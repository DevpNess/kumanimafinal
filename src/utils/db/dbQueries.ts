import prisma from "@/lib/prisma"
import { User, Account, Session, VerificationToken, Authenticator, Manga, StatusManga, TypeManga, AuthorManga, ScanManga, Genre, GenreManga, RatingManga, MangaLike, MangaSeeLater, MangaFavorite, MangaScraping } from "@prisma/client"

// =============================================
// USERS
// =============================================

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns Promise<User[]> Lista de todos los usuarios
 */
export async function getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany()
}

/**
 * Obtiene un usuario por su ID
 * @param id ID del usuario
 * @returns Promise<User | null> Usuario encontrado o null
 */
export async function getUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { id }
    })
}

/**
 * Obtiene un usuario por su email
 * @param email Email del usuario
 * @returns Promise<User | null> Usuario encontrado o null
 */
export async function getUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: { email }
    })
}

// =============================================
// ACCOUNTS
// =============================================

/**
 * Obtiene todas las cuentas de la base de datos
 * @returns Promise<Account[]> Lista de todas las cuentas
 */
export async function getAllAccounts(): Promise<Account[]> {
    return await prisma.account.findMany()
}

/**
 * Obtiene una cuenta por su proveedor y ID de cuenta
 * @param provider Proveedor de la cuenta
 * @param providerAccountId ID de la cuenta del proveedor
 * @returns Promise<Account | null> Cuenta encontrada o null
 */
export async function getAccountByProvider(
    provider: string,
    providerAccountId: string
): Promise<Account | null> {
    return await prisma.account.findUnique({
        where: {
            provider_providerAccountId: {
                provider,
                providerAccountId
            }
        }
    })
}

// =============================================
// MANGA
// =============================================

/**
 * Obtiene todos los mangas con sus relaciones
 * @returns Promise<Manga[]> Lista de todos los mangas con sus relaciones
 */
export async function getAllMangas(): Promise<Manga[]> {
    return await prisma.manga.findMany({
        include: {
            statusManga: true,
            typeManga: true,
            authorManga: true,
            scanManga: true,
            genres: {
                include: {
                    genre: true
                }
            }
        }
    })
}

/**
 * Obtiene un manga por su ID
 * @param id ID del manga
 * @returns Promise<Manga | null> Manga encontrado o null
 */
export async function getMangaById(id: number): Promise<Manga | null> {
    return await prisma.manga.findUnique({
        where: { id },
        include: {
            statusManga: true,
            typeManga: true,
            authorManga: true,
            scanManga: true,
            genres: {
                include: {
                    genre: true
                }
            }
        }
    })
}

// =============================================
// STATUS MANGA
// =============================================

/**
 * Obtiene todos los estados de manga
 * @returns Promise<StatusManga[]> Lista de todos los estados
 */
export async function getAllStatusManga(): Promise<StatusManga[]> {
    return await prisma.statusManga.findMany()
}

// =============================================
// TYPE MANGA
// =============================================

/**
 * Obtiene todos los tipos de manga
 * @returns Promise<TypeManga[]> Lista de todos los tipos
 */
export async function getAllTypeManga(): Promise<TypeManga[]> {
    return await prisma.typeManga.findMany()
}

// =============================================
// AUTHOR MANGA
// =============================================

/**
 * Obtiene todos los autores de manga
 * @returns Promise<AuthorManga[]> Lista de todos los autores
 */
export async function getAllAuthorManga(): Promise<AuthorManga[]> {
    return await prisma.authorManga.findMany()
}

// =============================================
// SCAN MANGA
// =============================================

/**
 * Obtiene todos los scans de manga
 * @returns Promise<ScanManga[]> Lista de todos los scans
 */
export async function getAllScanManga(): Promise<ScanManga[]> {
    return await prisma.scanManga.findMany()
}

// =============================================
// GENRE
// =============================================

/**
 * Obtiene todos los géneros
 * @returns Promise<Genre[]> Lista de todos los géneros
 */
export async function getAllGenres(): Promise<Genre[]> {
    return await prisma.genre.findMany()
}

// =============================================
// GENRE MANGA
// =============================================

/**
 * Obtiene todas las relaciones entre mangas y géneros
 * @returns Promise<GenreManga[]> Lista de todas las relaciones
 */
export async function getAllGenreManga(): Promise<GenreManga[]> {
    return await prisma.genreManga.findMany({
        include: {
            manga: true,
            genre: true
        }
    })
}

// =============================================
// RATING MANGA
// =============================================

/**
 * Obtiene todas las calificaciones de manga
 * @returns Promise<RatingManga[]> Lista de todas las calificaciones
 */
export async function getAllRatingManga(): Promise<RatingManga[]> {
    return await prisma.ratingManga.findMany({
        include: {
            user: true,
            manga: true
        }
    })
}

// =============================================
// MANGA LIKE
// =============================================

/**
 * Obtiene todos los likes de manga
 * @returns Promise<MangaLike[]> Lista de todos los likes
 */
export async function getAllMangaLikes(): Promise<MangaLike[]> {
    return await prisma.mangaLike.findMany({
        include: {
            user: true,
            manga: true
        }
    })
}

// =============================================
// MANGA SEE LATER
// =============================================

/**
 * Obtiene todos los "ver después" de manga
 * @returns Promise<MangaSeeLater[]> Lista de todos los "ver después"
 */
export async function getAllMangaSeeLater(): Promise<MangaSeeLater[]> {
    return await prisma.mangaSeeLater.findMany({
        include: {
            user: true,
            manga: true
        }
    })
}

// =============================================
// MANGA FAVORITE
// =============================================

/**
 * Obtiene todos los favoritos de manga
 * @returns Promise<MangaFavorite[]> Lista de todos los favoritos
 */
export async function getAllMangaFavorites(): Promise<MangaFavorite[]> {
    return await prisma.mangaFavorite.findMany({
        include: {
            user: true,
            manga: true
        }
    })
}

// =============================================
// MANGA SCRAPING
// =============================================

/**
 * Obtiene todos los datos de scraping de manga
 * @returns Promise<MangaScraping[]> Lista de todos los datos de scraping
 */
export async function getAllMangaScraping(): Promise<MangaScraping[]> {
    return await prisma.mangaScraping.findMany()
} 