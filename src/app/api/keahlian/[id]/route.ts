// app/api/keahlian/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getKeahlianById, updateKeahlian, deleteKeahlian } from '@/services/keahlianService';
import { standarResponse } from '@/utils/response';

// GET keahlian berdasarkan ID
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const keahlian = await getKeahlianById(Number(id));
    if (!keahlian) {
      return NextResponse.json(standarResponse(false, null, 'Keahlian tidak ditemukan'), { status: 404 });
    }
    return NextResponse.json(standarResponse(true, keahlian));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// PUT keahlian berdasarkan ID
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedKeahlian = await updateKeahlian(Number(id), body);
    return NextResponse.json(standarResponse(true, updatedKeahlian));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE keahlian berdasarkan ID
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteKeahlian(Number(id));
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}
