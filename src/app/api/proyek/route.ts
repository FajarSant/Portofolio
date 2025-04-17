// app/api/proyek/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  getSemuaProyek,
  getProyekById,
  createProyek,
  updateProyek,
  deleteProyek,
} from '@/services/proyekService';
import { standarResponse } from '@/utils/response';

// GET semua proyek atau berdasarkan ID
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const idParam = url.searchParams.get('id');

  if (idParam) {
    // GET by ID
    const id = Number(idParam);
    if (isNaN(id)) {
      return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
    }

    try {
      const proyek = await getProyekById(id);
      if (!proyek) {
        return NextResponse.json(standarResponse(false, null, 'Proyek tidak ditemukan'), { status: 404 });
      }

      return NextResponse.json(standarResponse(true, proyek), { status: 200 });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
      return NextResponse.json(standarResponse(false, null, message), { status: 500 });
    }
  }

  // GET semua proyek
  try {
    const semuaProyek = await getSemuaProyek();

    if (semuaProyek.length === 0) {
      return NextResponse.json(standarResponse(false, null, 'Proyek belum ditambahkan'), { status: 404 });
    }

    return NextResponse.json(
      standarResponse(true, {
        proyek: semuaProyek,
        jumlah: semuaProyek.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// POST proyek baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProyek = await createProyek(body);
    return NextResponse.json(standarResponse(true, newProyek), { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menambahkan proyek';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// PUT proyek by ID (via query string)
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get('id'));

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedProyek = await updateProyek(id, body);
    return NextResponse.json(standarResponse(true, updatedProyek), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate proyek';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE proyek by ID (via query string)
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get('id'));

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteProyek(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus proyek';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}
