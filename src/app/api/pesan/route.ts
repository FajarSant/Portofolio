// app/api/pesan/route.ts

import { NextRequest, NextResponse } from 'next/server';
import {
  getSemuaPesan,
  getPesanById,
  updatePesan,
  deletePesan,
  createPesan,
} from '@/services/pesanService';
import { standarResponse } from '@/utils/response';
import { IPesan } from '@/types';

// GET semua pesan atau pesan berdasarkan ID (via query string)
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
      const pesan = await getPesanById(id);
      if (!pesan) {
        return NextResponse.json(standarResponse(false, null, 'Data tidak ditemukan'), { status: 404 });
      }
      return NextResponse.json(standarResponse(true, pesan), { status: 200 });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal';
      return NextResponse.json(standarResponse(false, null, message), { status: 500 });
    }
  }

  // GET semua
  try {
    const semuaPesan = await getSemuaPesan();
    if (semuaPesan.length === 0) {
      return NextResponse.json(standarResponse(false, null, 'Pesan belum tersedia'), { status: 200 });
    }

    return NextResponse.json(
      standarResponse(true, {
        pesan: semuaPesan,
        jumlahPesan: semuaPesan.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// POST pesan baru
export async function POST(req: NextRequest) {
  try {
    const body: IPesan = await req.json();
    const newPesan = await createPesan(body);
    return NextResponse.json(standarResponse(true, newPesan), { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menambahkan pesan';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// PUT pesan by ID (via query string)
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get('id'));

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body: IPesan = await req.json();
    const updated = await updatePesan(id, body);
    return NextResponse.json(standarResponse(true, updated));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate pesan';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// DELETE pesan by ID (via query string)
export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get('id'));

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deletePesan(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus pesan';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}
