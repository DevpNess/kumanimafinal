import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { name: string , capitulo: string} }
) {
  const name = params.name
  const capitulo = params.capitulo// 'a', 'b', or 'c'
  return NextResponse.json({ mensaje:'Anime: '+name+' Capitulo: '+capitulo});
}
export async function POST(){
    
}
export async function PUT(){
    
}
export async function DELETE(){
    
}
export async function PATCH(){
    
}
export async function OPTION(){
    
}
export async function HEAD(){
    
}