# Resumen de Tablas y Relaciones de la Base de Datos (Prisma)

Este documento describe cada modelo (tabla) definido en el esquema Prisma del proyecto, su propósito, campos principales, relaciones y ejemplos de cómo obtener datos usando Prisma Client.

---

## 1. User (Usuario)
**Propósito:** Almacena los usuarios registrados en la plataforma.
- **Campos principales:** id, avatar, name, lastName, nickName, email, password, createdAt, updatedAt
- **Relaciones:**
  - Tiene muchas cuentas (Account), sesiones (Session), autenticadores (Authenticator), ratings, likes, favoritos, ver más tarde, métricas y analítica avanzada.
- **Ejemplo de consulta:**
```js
const usuarios = await prisma.user.findMany({ include: { mangas: true, ratings: true } })
```

## 2. Account (Cuenta de autenticación externa)
**Propósito:** Vincula usuarios con proveedores externos (OAuth, etc).
- **Campos principales:** userId, provider, providerAccountId, access_token, refresh_token
- **Relaciones:**
  - Pertenece a un usuario (User)
- **Ejemplo:**
```js
const cuentas = await prisma.account.findMany({ include: { user: true } })
```

## 3. Session (Sesión de usuario)
**Propósito:** Maneja sesiones activas de usuarios.
- **Campos principales:** sessionToken, userId, expires
- **Relaciones:**
  - Pertenece a un usuario (User)

## 4. VerificationToken (Token de verificación)
**Propósito:** Maneja tokens para verificación de email, recuperación, etc.
- **Campos principales:** identifier, token, expires

## 5. Authenticator (Autenticador WebAuthn)
**Propósito:** Soporte para autenticación avanzada (WebAuthn).
- **Campos principales:** credentialID, userId, providerAccountId, credentialPublicKey
- **Relaciones:**
  - Pertenece a un usuario (User)

## 6. Manga
**Propósito:** Almacena los mangas disponibles en la plataforma.
- **Campos principales:** id, path, title, description, statusId, typeId, authorId, scan, banner, views, likesCount, favoritesCount, releaseDate
- **Relaciones:**
  - Pertenece a un status, tipo, autor, scan
  - Tiene muchos géneros (GenreManga), ratings, likes, favoritos, ver más tarde, métricas y analítica avanzada
- **Ejemplo:**
```js
const mangas = await prisma.manga.findMany({ include: { genres: true, ratings: true } })
```

## 7. StatusManga, TypeManga, AuthorManga, ScanManga
**Propósito:** Catálogos para clasificar mangas por estado, tipo, autor y grupo de scan.
- **Relaciones:**
  - Cada uno tiene muchos mangas

## 8. Genre y GenreManga
**Propósito:**
- Genre: Catálogo de géneros
- GenreManga: Relación muchos a muchos entre Manga y Genre
- **Relaciones:**
  - GenreManga conecta Manga y Genre
- **Ejemplo:**
```js
const generosDeManga = await prisma.genreManga.findMany({ include: { manga: true, genre: true } })
```

## 9. RatingManga, MangaLike, MangaSeeLater, MangaFavorite
**Propósito:**
- RatingManga: Calificaciones de usuarios a mangas
- MangaLike: Likes de usuarios a mangas
- MangaSeeLater: Mangas marcados para ver después
- MangaFavorite: Mangas favoritos de usuarios
- **Relaciones:**
  - Todos conectan User y Manga

## 10. MangaScraping
**Propósito:** Configuración para scraping de mangas desde sitios externos.
- **Campos:** name, domain, selectores CSS para extraer datos

## 11. PageStats
**Propósito:** Métricas agregadas de la página (ingresos, usuarios activos, etc).
- **Campos:** date, totalRevenue, newCustomers, activeAccounts, growthRate

## 12. Métricas y Analítica Avanzada
- **Sesion:** Sesiones de usuario (User) con IP, userAgent, inicio, fin
- **PaginaVista:** Páginas vistas en una sesión, con URL, referrer, timestamp
- **Evento:** Eventos personalizados (click, scroll, etc) en una página vista
- **ErrorTecnico:** Errores técnicos reportados por usuarios
- **TiempoCarga:** Métricas de tiempo de carga de páginas
- **MangaView:** Registro de vistas de un manga por usuario
- **MangaRating:** Calificación avanzada de manga (1-5 estrellas)
- **MangaComentario:** Comentarios de usuarios en mangas
- **MangaFavorito:** Favoritos avanzados (muchos a muchos)
- **MangaCompartido:** Registro de mangas compartidos en redes/plataformas

**Ejemplo de consulta de analítica:**
```js
const sesiones = await prisma.sesion.findMany({ include: { usuario: true, paginas: true } })
const vistas = await prisma.paginaVista.findMany({ include: { usuario: true, sesion: true } })
```

---

**Nota:** Para obtener datos relacionados, usa la opción `include` de Prisma Client. Para búsquedas por campos únicos o relaciones, usa `findUnique`, `findMany` o `findFirst` según el caso.

---

Este resumen cubre todos los modelos y relaciones principales de la base de datos de Kumanima. Para detalles adicionales, consulta el archivo `schema.prisma` o la documentación de Prisma. 