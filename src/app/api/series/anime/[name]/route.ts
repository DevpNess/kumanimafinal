import { NextResponse } from 'next/server';
import  prisma  from "@/lib/prisma";
export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name
  return NextResponse.json({ mensaje:'Anime: '+name});
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