import prisma from "@/lib/prisma"
import { User, Account, Manga, StatusManga, TypeManga, AuthorManga, ScanManga, Genre, GenreManga, RatingManga, MangaLike, MangaSeeLater, MangaFavorite, MangaScraping } from "@prisma/client"

// =============================================
// USERS
// =============================================

/**
 * Actualiza un usuario existente
 * @param id ID del usuario a actualizar
 * @param data Datos a actualizar
 * @returns Promise<User> Usuario actualizado
 */
export async function updateUser(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    return await prisma.user.update({
        where: { id },
        data
    })
}

// =============================================
// ACCOUNTS
// =============================================

/**
 * Actualiza una cuenta existente
 * @param id ID de la cuenta a actualizar
 * @param data Datos a actualizar
 * @returns Promise<Account> Cuenta actualizada
 */
export async function updateAccount(id: string, data: Partial<Omit<Account, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Account> {
    return await prisma.account.update({
        where: { id },
        data
    })
}

// =============================================
// MANGA
// =============================================

/**
 * Actualiza un manga existente
 * @param id ID del manga a actualizar
 * @param data Datos a actualizar
 * @returns Promise<Manga> Manga actualizado
 */
export async function updateManga(id: number, data: Partial<Omit<Manga, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Manga> {
    return await prisma.manga.update({
        where: { id },
        data
    })
}

// =============================================
// STATUS MANGA
// =============================================

/**
 * Actualiza un estado de manga existente
 * @param id ID del estado a actualizar
 * @param data Datos a actualizar
 * @returns Promise<StatusManga> Estado actualizado
 */
export async function updateStatusManga(id: number, data: Partial<Omit<StatusManga, 'id'>>): Promise<StatusManga> {
    return await prisma.statusManga.update({
        where: { id },
        data
    })
}

// =============================================
// TYPE MANGA
// =============================================

/**
 * Actualiza un tipo de manga existente
 * @param id ID del tipo a actualizar
 * @param data Datos a actualizar
 * @returns Promise<TypeManga> Tipo actualizado
 */
export async function updateTypeManga(id: number, data: Partial<Omit<TypeManga, 'id'>>): Promise<TypeManga> {
    return await prisma.typeManga.update({
        where: { id },
        data
    })
}

// =============================================
// AUTHOR MANGA
// =============================================

/**
 * Actualiza un autor de manga existente
 * @param id ID del autor a actualizar
 * @param data Datos a actualizar
 * @returns Promise<AuthorManga> Autor actualizado
 */
export async function updateAuthorManga(id: number, data: Partial<Omit<AuthorManga, 'id'>>): Promise<AuthorManga> {
    return await prisma.authorManga.update({
        where: { id },
        data
    })
}

// =============================================
// SCAN MANGA
// =============================================

/**
 * Actualiza un scan de manga existente
 * @param id ID del scan a actualizar
 * @param data Datos a actualizar
 * @returns Promise<ScanManga> Scan actualizado
 */
export async function updateScanManga(id: number, data: Partial<Omit<ScanManga, 'id'>>): Promise<ScanManga> {
    return await prisma.scanManga.update({
        where: { id },
        data
    })
}

// =============================================
// GENRE
// =============================================

/**
 * Actualiza un género existente
 * @param id ID del género a actualizar
 * @param data Datos a actualizar
 * @returns Promise<Genre> Género actualizado
 */
export async function updateGenre(id: number, data: Partial<Omit<Genre, 'id'>>): Promise<Genre> {
    return await prisma.genre.update({
        where: { id },
        data
    })
}

// =============================================
// GENRE MANGA
// =============================================

/**
 * Actualiza una relación entre manga y género existente
 * @param id ID de la relación a actualizar
 * @param data Datos a actualizar
 * @returns Promise<GenreManga> Relación actualizada
 */
export async function updateGenreManga(id: number, data: Partial<Omit<GenreManga, 'id'>>): Promise<GenreManga> {
    return await prisma.genreManga.update({
        where: { id },
        data
    })
}

// =============================================
// RATING MANGA
// =============================================

/**
 * Actualiza una calificación de manga existente
 * @param id ID de la calificación a actualizar
 * @param data Datos a actualizar
 * @returns Promise<RatingManga> Calificación actualizada
 */
export async function updateRatingManga(id: number, data: Partial<Omit<RatingManga, 'id'>>): Promise<RatingManga> {
    return await prisma.ratingManga.update({
        where: { id },
        data
    })
}

// =============================================
// MANGA LIKE
// =============================================

/**
 * Actualiza un like de manga existente
 * @param id ID del like a actualizar
 * @param data Datos a actualizar
 * @returns Promise<MangaLike> Like actualizado
 */
export async function updateMangaLike(id: number, data: Partial<Omit<MangaLike, 'id'>>): Promise<MangaLike> {
    return await prisma.mangaLike.update({
        where: { id },
        data
    })
}

// =============================================
// MANGA SEE LATER
// =============================================

/**
 * Actualiza un "ver después" de manga existente
 * @param id ID del "ver después" a actualizar
 * @param data Datos a actualizar
 * @returns Promise<MangaSeeLater> "Ver después" actualizado
 */
export async function updateMangaSeeLater(id: number, data: Partial<Omit<MangaSeeLater, 'id'>>): Promise<MangaSeeLater> {
    return await prisma.mangaSeeLater.update({
        where: { id },
        data
    })
}

// =============================================
// MANGA FAVORITE
// =============================================

/**
 * Actualiza un favorito de manga existente
 * @param id ID del favorito a actualizar
 * @param data Datos a actualizar
 * @returns Promise<MangaFavorite> Favorito actualizado
 */
export async function updateMangaFavorite(id: number, data: Partial<Omit<MangaFavorite, 'id'>>): Promise<MangaFavorite> {
    return await prisma.mangaFavorite.update({
        where: { id },
        data
    })
}

// =============================================
// MANGA SCRAPING
// =============================================

/**
 * Actualiza datos de scraping de manga existentes
 * @param id ID de los datos de scraping a actualizar
 * @param data Datos a actualizar
 * @returns Promise<MangaScraping> Datos de scraping actualizados
 */
export async function updateMangaScraping(id: number, data: Partial<Omit<MangaScraping, 'id'>>): Promise<MangaScraping> {
    return await prisma.mangaScraping.update({
        where: { id },
        data
    })
} 