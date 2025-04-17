// app/api/keahlian/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getKeahlianById, updateKeahlian, deleteKeahlian } from '@/services/keahlianService';
import { standarResponse } from '@/utils/response';

// GET by ID (menggunakan query string)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get('id'));

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
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// PUT by ID (menggunakan query string)
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get('id'));

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedKeahlian = await updateKeahlian(id, body);
    return NextResponse.json(standarResponse(true, updatedKeahlian), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate data';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE by ID (menggunakan query string)
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get('id'));

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteKeahlian(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus data';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}
