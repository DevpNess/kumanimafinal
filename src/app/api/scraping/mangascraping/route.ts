import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    const body = await req.json();
    const nuevo = await prisma.mangaScraping.create({ data: body });
    return NextResponse.json(nuevo);
}

export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    let logs = '';
    let status = 'ok';
    try {
        if (id) {
            // Simulación de scraping para un solo sitio
            const sitio = await prisma.mangaScraping.findUnique({ where: { id: Number(id) } });
            if (!sitio) throw new Error('Sitio no encontrado');
            // Aquí iría la lógica real de scraping para el sitio
            logs = `Scraping ejecutado para el sitio: ${sitio.name} (ID: ${sitio.id})\n`;
            logs += 'Resultado: Éxito\n';
        } else {
            // Simulación de scraping para todos los sitios
            const sitios = await prisma.mangaScraping.findMany();
            logs = '';
            for (const sitio of sitios) {
                // Aquí iría la lógica real de scraping para cada sitio
                logs += `Scraping ejecutado para el sitio: ${sitio.name} (ID: ${sitio.id})\n`;
                logs += 'Resultado: Éxito\n';
            }
        }
    } catch (e: any) {
        status = 'error';
        logs += `Error: ${e.message || e}`;
    }
    return NextResponse.json({ status, logs });
}

export async function DELETE(){
    // Implement DELETE request here
    // Eliminar un elemento de la base de datos.

}

export async function PATCH(){
    // Implement PATCH request here
    //Modificar campos específicos de un elemento existente sin reemplazar el registro completo.

}

export async function OPTION(){
    // Implement OPTION request here
    // Lo utilizan los navegadores para determinar si se permite una solicitud de origen cruzado antes de enviar la solicitud real.
    return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers':   
     'Content-Type',
        },
      });
    
}

export async function HEAD(){
    // Implement HEAD request here
    // Obtener metadatos sobre un recurso sin el contenido real.

}
export async function GET(req: NextRequest) {
    // Obtener parámetros de paginación y búsqueda
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    // Filtro de búsqueda básico (por nombre o dominio)
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { domain: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [total, data] = await Promise.all([
      prisma.mangaScraping.count({ where }),
      prisma.mangaScraping.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
    ]);

    return NextResponse.json({ data, total, page, limit });
}