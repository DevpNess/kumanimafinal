import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

function getModel(table: string) {
  // Mapear el nombre de tabla a la propiedad de prisma
  // Asegúrate de que los nombres coincidan con los modelos de Prisma
  const models = {
    User: prisma.user,
    Account: prisma.account,
    Sesion: prisma.sesion,
    VerificationToken: prisma.verificationToken,
    Authenticator: prisma.authenticator,
    Manga: prisma.manga,
    StatusManga: prisma.statusManga,
    TypeManga: prisma.typeManga,
    AuthorManga: prisma.authorManga,
    ScanManga: prisma.scanManga,
    Genre: prisma.genre,
    GenreManga: prisma.genreManga,
    RatingManga: prisma.ratingManga,
    MangaLike: prisma.mangaLike,
    MangaSeeLater: prisma.mangaSeeLater,
    MangaFavorite: prisma.mangaFavorite,
    MangaScraping: prisma.mangaScraping,
    PageStats: prisma.pageStats,
    // Agrega aquí más modelos si los tienes
  };
  return models[table as keyof typeof models];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get('table');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const search = searchParams.get('search') || '';
  const skip = (page - 1) * limit;
  if (!table) return NextResponse.json({ error: 'No table specified' }, { status: 400 });
  const model = getModel(table) as any;
  if (!model) return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  // Búsqueda básica solo por campos string
  let where = {};
  if (search) {
    // Obtener campos string del modelo
    // Aquí podrías mejorar para cada modelo
    where = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ],
    };
  }
  // Determinar campo de ordenación adecuado
  let orderByField = 'id';
  if (table === 'VerificationToken') orderByField = 'identifier';
  if (table === 'GenreManga') orderByField = 'mangaId';
  if (table === 'RatingManga') orderByField = 'id';
  if (table === 'Sesion') orderByField = 'sessionToken';
  if (table === 'Account') orderByField = 'userId';
  if (table === 'MangaSeeLater' || table === 'MangaFavorite' || table === 'MangaLike') orderByField = 'id';
  if (table === 'Authenticator') orderByField = 'id';
  if (table === 'ScanManga') orderByField = 'id';
  if (table === 'Genre') orderByField = 'id';
  if (table === 'StatusManga') orderByField = 'id';
  if (table === 'TypeManga') orderByField = 'id';
  if (table === 'AuthorManga') orderByField = 'id';
  if (table === 'MangaScraping') orderByField = 'id';
  // ... puedes agregar más casos según tus modelos

  const [total, data] = await Promise.all([
    model.count({ where }),
    model.findMany({ where, skip, take: limit, orderBy: { [orderByField]: 'asc' } }),
  ]);
  return NextResponse.json({ data, total, page, limit });
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get('table');
  if (!table) return NextResponse.json({ error: 'No table specified' }, { status: 400 });
  const model = getModel(table) as any;
  if (!model) return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  const body = await req.json();
  const created = await model.create({ data: body });
  return NextResponse.json(created);
}

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get('table');
  if (!table) return NextResponse.json({ error: 'No table specified' }, { status: 400 });
  const model = getModel(table) as any;
  if (!model) return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: 'No id provided' }, { status: 400 });
  const updated = await model.update({ where: { id: body.id }, data: body });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get('table');
  if (!table) return NextResponse.json({ error: 'No table specified' }, { status: 400 });
  const model = getModel(table) as any;
  if (!model) return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: 'No id provided' }, { status: 400 });
  const deleted = await model.delete({ where: { id: body.id } });
  return NextResponse.json(deleted);
} 