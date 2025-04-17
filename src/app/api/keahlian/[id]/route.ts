// app/api/keahlian/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getKeahlianById, updateKeahlian, deleteKeahlian } from '@/services/keahlianService';
import { standarResponse } from '@/utils/response';

// GET keahlian by ID dari URL path
export async function GET(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop());

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const keahlian = await getKeahlianById(id);
    if (!keahlian) {
      return NextResponse.json(standarResponse(false, null, 'Keahlian tidak ditemukan'), { status: 404 });
    }
    return NextResponse.json(standarResponse(true, keahlian), { status: 200 });
  } catch (error) {
    console.error('ERROR GET BY ID:', error);
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// PUT keahlian by ID
export async function PUT(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop());

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updated = await updateKeahlian(id, body);
    return NextResponse.json(standarResponse(true, updated), { status: 200 });
  } catch (error) {
    console.error('ERROR PUT:', error);
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate data';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE keahlian by ID
export async function DELETE(req: NextRequest) {
  const id = Number(req.nextUrl.pathname.split('/').pop());

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteKeahlian(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    console.error('ERROR DELETE:', error);
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus data';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

