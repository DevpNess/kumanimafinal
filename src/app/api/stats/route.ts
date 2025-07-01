import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const stats = await prisma.pageStats.findMany({ orderBy: { date: 'asc' } });
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const stat = await prisma.pageStats.create({ data: body });
  return NextResponse.json(stat);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const stat = await prisma.pageStats.update({ where: { id: body.id }, data: body });
  return NextResponse.json(stat);
} 