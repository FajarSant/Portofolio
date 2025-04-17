// app/api/pesan/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getPesanById, updatePesan, deletePesan } from '@/services/pesanService';
import { standarResponse } from '@/utils/response';

// GET pesan berdasarkan ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const pesan = await getPesanById(Number(id));
    if (!pesan) {
      return NextResponse.json(standarResponse(false, null, 'Pesan tidak ditemukan'), { status: 404 });
    }
    return NextResponse.json(standarResponse(true, pesan));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// PUT pesan berdasarkan ID
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedPesan = await updatePesan(Number(id), body);
    return NextResponse.json(standarResponse(true, updatedPesan));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE pesan berdasarkan ID
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deletePesan(Number(id));
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}
