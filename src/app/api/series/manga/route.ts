import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next';
export async function GET() { //Se utiliza para recuperar datos de un servidor.

    try {
        const mangas = await prisma.manga.findMany()
        return NextResponse.json({ mangas })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
            }, {
                status: 500,
            })
        }
    }
}
export async function POST(request: Request) { //Se utiliza para enviar datos a un servidor para crear o actualizar recursos.

    try {
        const data = await request.json()
        const newManga = await prisma.manga.create({
            data: {
                title: data.title,
                description: data,
                chapters         : data.chapters      ,   
                pathChapters : data.pathChapters,
                statusR      : data.statusR,
                statusId     : data.statusId,
                type         : data.type,
                typeId       : data.typeId,
                author      : data.author,
                authorId     : data.authorId,
                scan          : data.scan,
                genres      : data.genres,
                banner       : data.banner,
                views      : data.views,
                dayViews   : data.dayViews,
                weekViews  : data.weekViews,
                monthViews : data.monthViews,
                likes      : data.likes,
                favorite      : data.favorite,
                seeLater   : data.seeLater,
                rating     : data.rating,
                ranking       : data.ranking,
                updateLast   : data.updateLast,
                updateNext: data.updateNext,
            },
        })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
            }, {
                status: 500,
            })
        }
    }
}
export async function PUT() { // Se utiliza para actualizaciones completas de recursos existentes

}

export async function PATCH() { // Se utiliza para actualizaciones parciales de recursos existentes.


}

export async function DELETE() { // Se utiliza para eliminar recursos existentes.


}

export async function OPTION(req: NextApiRequest, res: NextApiResponse) { // Se utiliza para determinar los métodos HTTP admitidos para un recurso.

    res.status(200).json({ metodosPermitidos: ['GET', 'POST', 'PUT', 'DELETE'] });
}

export async function HEAD(req: NextApiRequest, res: NextApiResponse) { //Se utiliza para recuperar la meta información sobre un recurso sin transferir el contenido real.


}