// app/api/proyek/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProyekById, updateProyek, deleteProyek } from '@/services/proyekService';
import { standarResponse } from '@/utils/response';

// GET proyek berdasarkan ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const proyek = await getProyekById(Number(id));
    if (!proyek) {
      return NextResponse.json(standarResponse(false, null, 'Proyek tidak ditemukan'), { status: 404 });
    }
    return NextResponse.json(standarResponse(true, proyek));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// PUT proyek berdasarkan ID
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedProyek = await updateProyek(Number(id), body);
    return NextResponse.json(standarResponse(true, updatedProyek));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE proyek berdasarkan ID
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteProyek(Number(id));
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}
