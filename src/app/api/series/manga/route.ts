import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { MangaApiResponse, MangaApiError, MangaFilters, MangaPagination, MangaApiResponseWithPagination } from "@/types/manga";
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET(request: Request): Promise<NextResponse<MangaApiResponse | MangaApiError | MangaApiResponseWithPagination>> {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parámetros de paginación
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // Parámetros de filtros
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const author = searchParams.get('author');
    const genre = searchParams.get('genre');
    const search = searchParams.get('search');
    
    // Construir filtros
    const where: any = {};
    
    if (status) {
      where.statusManga = { name: status };
    }
    
    if (type) {
      where.typeManga = { name: type };
    }
    
    if (author) {
      where.authorManga = { name: { contains: author, mode: 'insensitive' } };
    }
    
    if (genre) {
      where.genres = {
        some: {
          genre: {
            name: { contains: genre, mode: 'insensitive' }
          }
        }
      };
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { authorManga: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }
    
    // Obtener total de registros para paginación
    const total = await prisma.manga.count({ where });
    const totalPages = Math.ceil(total / limit);
    
    // Obtener mangas con filtros y paginación
    const mangas = await prisma.manga.findMany({
      where,
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
      },
      orderBy: {
        updateLast: 'desc'
      },
      skip: offset,
      take: limit
    });
    
    // Mapear propiedades adicionales para compatibilidad
    const mangasWithExtraProps = mangas.map(manga => {
      // Generar capítulos de ejemplo si no existen
      const primaryChapter = {
        chapter: `${manga.cap}`,
        date: new Date(manga.updateLast),
        url: `/manga/${manga.id}/capitulo/${manga.cap}`
      };
      
      const secondaryChapter = {
        chapter: `${Math.max(1, manga.cap - 1)}`,
        date: new Date(new Date(manga.updateLast).getTime() - 24 * 60 * 60 * 1000), // 1 día antes
        url: `/manga/${manga.id}/capitulo/${Math.max(1, manga.cap - 1)}`
      };

      return {
        ...manga,
        name: manga.title, // name = title
        pathSerie: `/manga/${manga.id}`, // pathSerie basado en ID
        pathImage: manga.banner || `/media/manga/manga-img-${manga.id}.png`, // pathImage = banner o fallback
        author: manga.authorManga?.name || 'Autor desconocido', // author desde relación
        primaryChapter,
        secondaryChapter,
      };
    });

    // Si hay parámetros de paginación, devolver con paginación
    if (searchParams.has('page') || searchParams.has('limit')) {
      const pagination: MangaPagination = {
        page,
        limit,
        total,
        totalPages
      };
      
      return NextResponse.json({ 
        mangas: mangasWithExtraProps, 
        pagination 
      });
    }
    
    // Si no hay paginación, devolver respuesta simple
    return NextResponse.json({ mangas: mangasWithExtraProps });
  } catch (error) {
    console.error('Error fetching mangas:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data = await request.json();
    
    const newManga = await prisma.manga.create({
      data: {
        title: data.title,
        name: data.name || data.title, // Agregar name
        description: data.description,
        path: data.path,
        cap: data.cap || 0,
        statusId: data.statusId,
        typeId: data.typeId,
        authorId: data.authorId,
        scan: data.scan,
        banner: data.banner || data.pathImage, // Usar pathImage como fallback
        views: data.views || 0,
        dayViews: data.dayViews || 0,
        weekViews: data.weekViews || 0,
        monthViews: data.monthViews || 0,
        likesCount: data.likesCount || 0,
        favoritesCount: data.favoritesCount || 0,
        seeLaterCount: data.seeLaterCount || 0,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : new Date(),
        updateNext: data.updateNext ? new Date(data.updateNext) : null,
      },
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
    });

    // Mapear propiedades adicionales
    const primaryChapter = {
      chapter: `${newManga.cap}`,
      date: new Date(newManga.updateLast),
      url: `/manga/${newManga.id}/capitulo/${newManga.cap}`
    };
    
    const secondaryChapter = {
      chapter: `${Math.max(1, newManga.cap - 1)}`,
      date: new Date(new Date(newManga.updateLast).getTime() - 24 * 60 * 60 * 1000),
      url: `/manga/${newManga.id}/capitulo/${Math.max(1, newManga.cap - 1)}`
    };

    const mangaWithExtraProps = {
      ...newManga,
      name: newManga.title,
      pathSerie: `/manga/${newManga.id}`,
      pathImage: newManga.banner || `/media/manga/manga-img-${newManga.id}.png`,
      author: newManga.authorManga?.name || 'Autor desconocido',
      primaryChapter,
      secondaryChapter,
    };

    return NextResponse.json({ manga: mangaWithExtraProps }, { status: 201 });
  } catch (error) {
    console.error('Error creating manga:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { message: 'ID de manga requerido' },
        { status: 400 }
      );
    }

    const updatedManga = await prisma.manga.update({
      where: { id: parseInt(id) },
      data: {
        ...updateData,
        name: updateData.name || updateData.title, // Agregar name
        banner: updateData.banner || updateData.pathImage, // Usar pathImage como fallback
      },
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
    });

    // Mapear propiedades adicionales
    const primaryChapter = {
      chapter: `${updatedManga.cap}`,
      date: new Date(updatedManga.updateLast),
      url: `/manga/${updatedManga.id}/capitulo/${updatedManga.cap}`
    };
    
    const secondaryChapter = {
      chapter: `${Math.max(1, updatedManga.cap - 1)}`,
      date: new Date(new Date(updatedManga.updateLast).getTime() - 24 * 60 * 60 * 1000),
      url: `/manga/${updatedManga.id}/capitulo/${Math.max(1, updatedManga.cap - 1)}`
    };

    const mangaWithExtraProps = {
      ...updatedManga,
      name: updatedManga.title,
      pathSerie: `/manga/${updatedManga.id}`,
      pathImage: updatedManga.banner || `/media/manga/manga-img-${updatedManga.id}.png`,
      author: updatedManga.authorManga?.name || 'Autor desconocido',
      primaryChapter,
      secondaryChapter,
    };

    return NextResponse.json({ manga: mangaWithExtraProps });
  } catch (error) {
    console.error('Error updating manga:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { message: 'ID de manga requerido' },
        { status: 400 }
      );
    }

    await prisma.manga.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: 'Manga eliminado exitosamente' });
  } catch (error) {
    console.error('Error deleting manga:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function OPTION(req: NextApiRequest, res: NextApiResponse) { // Se utiliza para determinar los métodos HTTP admitidos para un recurso.

    res.status(200).json({ metodosPermitidos: ['GET', 'POST', 'PUT', 'DELETE'] });
}

export async function HEAD(req: NextApiRequest, res: NextApiResponse) { //Se utiliza para recuperar la meta información sobre un recurso sin transferir el contenido real.


}