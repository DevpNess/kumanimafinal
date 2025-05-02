import prisma from '@/lib/prisma'
export async function POST(){
    // Implement POST request here
    //Agregar un nuevo elemento a una base de datos, como un nuevo usuario, producto o artículo.
}

export async function PUT(){
    // Implement PUT request here
    //Reemplazar un elemento existente en la base de datos con datos completamente nuevos.

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
export async function GET(){
    // Implement GET request here
    //Obtener una lista de elementos de una base de datos, como productos, usuarios o artículos
    const MangaScraping = prisma.mangaScraping.findMany(); 
    return MangaScraping;
    }