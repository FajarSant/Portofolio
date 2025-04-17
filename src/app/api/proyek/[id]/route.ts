// app/api/proyek/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getProyekById, updateProyek, deleteProyek } from '@/services/proyekService';
import { standarResponse } from '@/utils/response';

// GET proyek by ID
export async function GET(req: NextRequest) {
  // Extract the ID from the URL path using request URL
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop() || '');

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const proyek = await getProyekById(id);
    if (!proyek) {
      return NextResponse.json(standarResponse(false, null, 'Proyek tidak ditemukan'), { status: 404 });
    }

    return NextResponse.json(standarResponse(true, proyek));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// PUT proyek by ID
export async function PUT(req: NextRequest) {
  // Extract the ID from the URL path using request URL
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop() || '');

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedProyek = await updateProyek(id, body);
    return NextResponse.json(standarResponse(true, updatedProyek));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE proyek by ID
export async function DELETE(req: NextRequest) {
  // Extract the ID from the URL path using request URL
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop() || '');

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteProyek(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}
