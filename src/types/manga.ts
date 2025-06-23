// Tipos centralizados para Manga y capítulos

export interface ChapterDB {
  id: number;
  number: string;
  createdAt: string; // ISO string
  url?: string;
  // ...otros campos relevantes
}

export interface MangaDB {
  id: number;
  path: string;
  cap: number;
  title: string;
  name: string;
  description: string;
  statusId: number;
  typeId: number;
  authorId: number;
  scan: number;
  banner?: string;
  pathImage?: string;
  pathSerie?: string;
  author?: string;
  views: number;
  dayViews: number;
  weekViews: number;
  monthViews: number;
  likesCount: number;
  favoritesCount: number;
  seeLaterCount: number;
  releaseDate: string;
  updateLast: string;
  updateNext?: string;
  // Relaciones
  statusManga?: StatusManga;
  typeManga?: TypeManga;
  authorManga?: AuthorManga;
  scanManga?: ScanManga;
  genres?: GenreManga[];
  chapters?: ChapterDB[];
  // Propiedades para CardSerie
  primaryChapter?: {
    chapter: string;
    date: Date;
    url: string;
  };
  secondaryChapter?: {
    chapter: string;
    date: Date;
    url: string;
  };
}

export interface StatusManga {
  id: number;
  name: string;
}

export interface TypeManga {
  id: number;
  name: string;
}

export interface AuthorManga {
  id: number;
  name: string;
}

export interface ScanManga {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GenreManga {
  mangaId: number;
  genreId: number;
  genre?: Genre;
}

// Tipo adaptado para CardSerie
export interface CardSerieManga {
  name: string;
  pathSerie: string;
  pathImage: string;
  author: string;
  primaryChapter?: {
    chapter: string;
    date: Date;
    url: string;
  };
  secondaryChapter?: {
    chapter: string;
    date: Date;
    url: string;
  };
}

// Tipos para la API
export interface MangaApiResponse {
  mangas: MangaDB[];
}

export interface MangaApiError {
  message: string;
}

// Tipos para filtros y paginación
export interface MangaFilters {
  status?: string;
  type?: string;
  author?: string;
  genre?: string;
  search?: string;
}

export interface MangaPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MangaApiResponseWithPagination {
  mangas: MangaDB[];
  pagination: MangaPagination;
} 