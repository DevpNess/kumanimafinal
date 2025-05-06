import prisma from "@/lib/prisma"
import { User, Account, Manga, StatusManga, TypeManga, AuthorManga, ScanManga, Genre, GenreManga, RatingManga, MangaLike, MangaSeeLater, MangaFavorite, MangaScraping } from "@prisma/client"

// =============================================
// USERS
// =============================================

/**
 * Elimina un usuario
 * @param id ID del usuario a eliminar
 * @returns Promise<User> Usuario eliminado
 */
export async function deleteUser(id: string): Promise<User> {
    return await prisma.user.delete({
        where: { id }
    })
}

// =============================================
// ACCOUNTS
// =============================================

/**
 * Elimina una cuenta
 * @param id ID de la cuenta a eliminar
 * @returns Promise<Account> Cuenta eliminada
 */
export async function deleteAccount(id: string): Promise<Account> {
    return await prisma.account.delete({
        where: { id }
    })
}

// =============================================
// MANGA
// =============================================

/**
 * Elimina un manga
 * @param id ID del manga a eliminar
 * @returns Promise<Manga> Manga eliminado
 */
export async function deleteManga(id: number): Promise<Manga> {
    return await prisma.manga.delete({
        where: { id }
    })
}

// =============================================
// STATUS MANGA
// =============================================

/**
 * Elimina un estado de manga
 * @param id ID del estado a eliminar
 * @returns Promise<StatusManga> Estado eliminado
 */
export async function deleteStatusManga(id: number): Promise<StatusManga> {
    return await prisma.statusManga.delete({
        where: { id }
    })
}

// =============================================
// TYPE MANGA
// =============================================

/**
 * Elimina un tipo de manga
 * @param id ID del tipo a eliminar
 * @returns Promise<TypeManga> Tipo eliminado
 */
export async function deleteTypeManga(id: number): Promise<TypeManga> {
    return await prisma.typeManga.delete({
        where: { id }
    })
}

// =============================================
// AUTHOR MANGA
// =============================================

/**
 * Elimina un autor de manga
 * @param id ID del autor a eliminar
 * @returns Promise<AuthorManga> Autor eliminado
 */
export async function deleteAuthorManga(id: number): Promise<AuthorManga> {
    return await prisma.authorManga.delete({
        where: { id }
    })
}

// =============================================
// SCAN MANGA
// =============================================

/**
 * Elimina un scan de manga
 * @param id ID del scan a eliminar
 * @returns Promise<ScanManga> Scan eliminado
 */
export async function deleteScanManga(id: number): Promise<ScanManga> {
    return await prisma.scanManga.delete({
        where: { id }
    })
}

// =============================================
// GENRE
// =============================================

/**
 * Elimina un género
 * @param id ID del género a eliminar
 * @returns Promise<Genre> Género eliminado
 */
export async function deleteGenre(id: number): Promise<Genre> {
    return await prisma.genre.delete({
        where: { id }
    })
}

// =============================================
// GENRE MANGA
// =============================================

/**
 * Elimina una relación entre manga y género
 * @param id ID de la relación a eliminar
 * @returns Promise<GenreManga> Relación eliminada
 */
export async function deleteGenreManga(id: number): Promise<GenreManga> {
    return await prisma.genreManga.delete({
        where: { id }
    })
}

// =============================================
// RATING MANGA
// =============================================

/**
 * Elimina una calificación de manga
 * @param id ID de la calificación a eliminar
 * @returns Promise<RatingManga> Calificación eliminada
 */
export async function deleteRatingManga(id: number): Promise<RatingManga> {
    return await prisma.ratingManga.delete({
        where: { id }
    })
}

// =============================================
// MANGA LIKE
// =============================================

/**
 * Elimina un like de manga
 * @param id ID del like a eliminar
 * @returns Promise<MangaLike> Like eliminado
 */
export async function deleteMangaLike(id: number): Promise<MangaLike> {
    return await prisma.mangaLike.delete({
        where: { id }
    })
}

// =============================================
// MANGA SEE LATER
// =============================================

/**
 * Elimina un "ver después" de manga
 * @param id ID del "ver después" a eliminar
 * @returns Promise<MangaSeeLater> "Ver después" eliminado
 */
export async function deleteMangaSeeLater(id: number): Promise<MangaSeeLater> {
    return await prisma.mangaSeeLater.delete({
        where: { id }
    })
}

// =============================================
// MANGA FAVORITE
// =============================================

/**
 * Elimina un favorito de manga
 * @param id ID del favorito a eliminar
 * @returns Promise<MangaFavorite> Favorito eliminado
 */
export async function deleteMangaFavorite(id: number): Promise<MangaFavorite> {
    return await prisma.mangaFavorite.delete({
        where: { id }
    })
}

// =============================================
// MANGA SCRAPING
// =============================================

/**
 * Elimina datos de scraping de manga
 * @param id ID de los datos de scraping a eliminar
 * @returns Promise<MangaScraping> Datos de scraping eliminados
 */
export async function deleteMangaScraping(id: number): Promise<MangaScraping> {
    return await prisma.mangaScraping.delete({
        where: { id }
    })
} 