import prisma from "@/lib/prisma"
import { User, Account, Sesion, VerificationToken, Authenticator, Manga, StatusManga, TypeManga, AuthorManga, ScanManga, Genre, GenreManga, RatingManga, MangaLike, MangaSeeLater, MangaFavorite, MangaScraping } from "@prisma/client"

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
 * Crea un nuevo usuario en la base de datos
 * @param data Datos del usuario a crear
 * @returns Promise<User> Usuario creado
 */
export async function createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await prisma.user.create({ data })
}

/**
 * Actualiza un usuario existente
 * @param id ID del usuario a actualizar
 * @param data Datos a actualizar
 * @returns Promise<User> Usuario actualizado
 */
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
        where: { id },
        data
    })
}

/**
 * Elimina un usuario de la base de datos
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
 * Obtiene todas las cuentas de la base de datos
 * @returns Promise<Account[]> Lista de todas las cuentas
 */
export async function getAllAccounts(): Promise<Account[]> {
    return await prisma.account.findMany()
}

/**
 * Crea una nueva cuenta
 * @param data Datos de la cuenta a crear
 * @returns Promise<Account> Cuenta creada
 */
export async function createAccount(data: Omit<Account, 'createdAt' | 'updatedAt'>): Promise<Account> {
    return await prisma.account.create({ data })
}

/**
 * Actualiza una cuenta existente
 * @param provider Proveedor de la cuenta
 * @param providerAccountId ID de la cuenta del proveedor
 * @param data Datos a actualizar
 * @returns Promise<Account> Cuenta actualizada
 */
export async function updateAccount(
    provider: string,
    providerAccountId: string,
    data: Partial<Account>
): Promise<Account> {
    return await prisma.account.update({
        where: {
            provider_providerAccountId: {
                provider,
                providerAccountId
            }
        },
        data
    })
}

/**
 * Elimina una cuenta
 * @param provider Proveedor de la cuenta
 * @param providerAccountId ID de la cuenta del proveedor
 * @returns Promise<Account> Cuenta eliminada
 */
export async function deleteAccount(provider: string, providerAccountId: string): Promise<Account> {
    return await prisma.account.delete({
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
 * Crea un nuevo manga
 * @param data Datos del manga a crear
 * @returns Promise<Manga> Manga creado
 */
export async function createManga(data: Omit<Manga, 'id' | 'createdAt' | 'updatedAt'>): Promise<Manga> {
    return await prisma.manga.create({ data })
}

/**
 * Actualiza un manga existente
 * @param id ID del manga a actualizar
 * @param data Datos a actualizar
 * @returns Promise<Manga> Manga actualizado
 */
export async function updateManga(id: number, data: Partial<Manga>): Promise<Manga> {
    return await prisma.manga.update({
        where: { id },
        data
    })
}

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
 * Obtiene todos los estados de manga
 * @returns Promise<StatusManga[]> Lista de todos los estados
 */
export async function getAllStatusManga(): Promise<StatusManga[]> {
    return await prisma.statusManga.findMany()
}

/**
 * Crea un nuevo estado de manga
 * @param data Datos del estado a crear
 * @returns Promise<StatusManga> Estado creado
 */
export async function createStatusManga(data: Omit<StatusManga, 'id'>): Promise<StatusManga> {
    return await prisma.statusManga.create({ data })
}

/**
 * Actualiza un estado de manga
 * @param id ID del estado a actualizar
 * @param data Datos a actualizar
 * @returns Promise<StatusManga> Estado actualizado
 */
export async function updateStatusManga(id: number, data: Partial<StatusManga>): Promise<StatusManga> {
    return await prisma.statusManga.update({
        where: { id },
        data
    })
}

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
 * Obtiene todos los tipos de manga
 * @returns Promise<TypeManga[]> Lista de todos los tipos
 */
export async function getAllTypeManga(): Promise<TypeManga[]> {
    return await prisma.typeManga.findMany()
}

/**
 * Crea un nuevo tipo de manga
 * @param data Datos del tipo a crear
 * @returns Promise<TypeManga> Tipo creado
 */
export async function createTypeManga(data: Omit<TypeManga, 'id'>): Promise<TypeManga> {
    return await prisma.typeManga.create({ data })
}

/**
 * Actualiza un tipo de manga
 * @param id ID del tipo a actualizar
 * @param data Datos a actualizar
 * @returns Promise<TypeManga> Tipo actualizado
 */
export async function updateTypeManga(id: number, data: Partial<TypeManga>): Promise<TypeManga> {
    return await prisma.typeManga.update({
        where: { id },
        data
    })
}

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
 * Obtiene todos los autores de manga
 * @returns Promise<AuthorManga[]> Lista de todos los autores
 */
export async function getAllAuthorManga(): Promise<AuthorManga[]> {
    return await prisma.authorManga.findMany()
}

/**
 * Crea un nuevo autor de manga
 * @param data Datos del autor a crear
 * @returns Promise<AuthorManga> Autor creado
 */
export async function createAuthorManga(data: Omit<AuthorManga, 'id'>): Promise<AuthorManga> {
    return await prisma.authorManga.create({ data })
}

/**
 * Actualiza un autor de manga
 * @param id ID del autor a actualizar
 * @param data Datos a actualizar
 * @returns Promise<AuthorManga> Autor actualizado
 */
export async function updateAuthorManga(id: number, data: Partial<AuthorManga>): Promise<AuthorManga> {
    return await prisma.authorManga.update({
        where: { id },
        data
    })
}

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
 * Obtiene todos los scans de manga
 * @returns Promise<ScanManga[]> Lista de todos los scans
 */
export async function getAllScanManga(): Promise<ScanManga[]> {
    return await prisma.scanManga.findMany()
}

/**
 * Crea un nuevo scan de manga
 * @param data Datos del scan a crear
 * @returns Promise<ScanManga> Scan creado
 */
export async function createScanManga(data: Omit<ScanManga, 'id'>): Promise<ScanManga> {
    return await prisma.scanManga.create({ data })
}

/**
 * Actualiza un scan de manga
 * @param id ID del scan a actualizar
 * @param data Datos a actualizar
 * @returns Promise<ScanManga> Scan actualizado
 */
export async function updateScanManga(id: number, data: Partial<ScanManga>): Promise<ScanManga> {
    return await prisma.scanManga.update({
        where: { id },
        data
    })
}

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
 * Obtiene todos los géneros
 * @returns Promise<Genre[]> Lista de todos los géneros
 */
export async function getAllGenres(): Promise<Genre[]> {
    return await prisma.genre.findMany()
}

/**
 * Crea un nuevo género
 * @param data Datos del género a crear
 * @returns Promise<Genre> Género creado
 */
export async function createGenre(data: Omit<Genre, 'id'>): Promise<Genre> {
    return await prisma.genre.create({ data })
}

/**
 * Actualiza un género
 * @param id ID del género a actualizar
 * @param data Datos a actualizar
 * @returns Promise<Genre> Género actualizado
 */
export async function updateGenre(id: number, data: Partial<Genre>): Promise<Genre> {
    return await prisma.genre.update({
        where: { id },
        data
    })
}

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

/**
 * Crea una nueva relación entre manga y género
 * @param data Datos de la relación a crear
 * @returns Promise<GenreManga> Relación creada
 */
export async function createGenreManga(data: Omit<GenreManga, 'id'>): Promise<GenreManga> {
    return await prisma.genreManga.create({ data })
}

/**
 * Elimina una relación entre manga y género
 * @param mangaId ID del manga
 * @param genreId ID del género
 * @returns Promise<GenreManga> Relación eliminada
 */
export async function deleteGenreManga(mangaId: number, genreId: number): Promise<GenreManga> {
    return await prisma.genreManga.delete({
        where: {
            mangaId_genreId: {
                mangaId,
                genreId
            }
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

/**
 * Crea una nueva calificación de manga
 * @param data Datos de la calificación a crear
 * @returns Promise<RatingManga> Calificación creada
 */
export async function createRatingManga(data: Omit<RatingManga, 'id'>): Promise<RatingManga> {
    return await prisma.ratingManga.create({ data })
}

/**
 * Actualiza una calificación de manga
 * @param id ID de la calificación a actualizar
 * @param data Datos a actualizar
 * @returns Promise<RatingManga> Calificación actualizada
 */
export async function updateRatingManga(id: number, data: Partial<RatingManga>): Promise<RatingManga> {
    return await prisma.ratingManga.update({
        where: { id },
        data
    })
}

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

/**
 * Crea un nuevo like de manga
 * @param data Datos del like a crear
 * @returns Promise<MangaLike> Like creado
 */
export async function createMangaLike(data: Omit<MangaLike, 'id'>): Promise<MangaLike> {
    return await prisma.mangaLike.create({ data })
}

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

/**
 * Crea un nuevo "ver después" de manga
 * @param data Datos del "ver después" a crear
 * @returns Promise<MangaSeeLater> "Ver después" creado
 */
export async function createMangaSeeLater(data: Omit<MangaSeeLater, 'id'>): Promise<MangaSeeLater> {
    return await prisma.mangaSeeLater.create({ data })
}

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

/**
 * Crea un nuevo favorito de manga
 * @param data Datos del favorito a crear
 * @returns Promise<MangaFavorite> Favorito creado
 */
export async function createMangaFavorite(data: Omit<MangaFavorite, 'id'>): Promise<MangaFavorite> {
    return await prisma.mangaFavorite.create({ data })
}

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
 * Obtiene todos los datos de scraping de manga
 * @returns Promise<MangaScraping[]> Lista de todos los datos de scraping
 */
export async function getAllMangaScraping(): Promise<MangaScraping[]> {
    return await prisma.mangaScraping.findMany()
}

/**
 * Crea nuevos datos de scraping de manga
 * @param data Datos de scraping a crear
 * @returns Promise<MangaScraping> Datos de scraping creados
 */
export async function createMangaScraping(data: Omit<MangaScraping, 'id'>): Promise<MangaScraping> {
    return await prisma.mangaScraping.create({ data })
}

/**
 * Actualiza datos de scraping de manga
 * @param id ID de los datos a actualizar
 * @param data Datos a actualizar
 * @returns Promise<MangaScraping> Datos actualizados
 */
export async function updateMangaScraping(id: number, data: Partial<MangaScraping>): Promise<MangaScraping> {
    return await prisma.mangaScraping.update({
        where: { id },
        data
    })
}

/**
 * Elimina datos de scraping de manga
 * @param id ID de los datos a eliminar
 * @returns Promise<MangaScraping> Datos eliminados
 */
export async function deleteMangaScraping(id: number): Promise<MangaScraping> {
    return await prisma.mangaScraping.delete({
        where: { id }
    })
}