import { NextRequest, NextResponse } from 'next/server';
import {
  createKeahlian,
  getSemuaKeahlian,
  getKeahlianById,
  updateKeahlian,
  deleteKeahlian,
} from '@/services/keahlianService';
import { standarResponse } from '@/utils/response';

// GET semua keahlian atau berdasarkan ID (jika ada query string `?id=`)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const idParam = url.searchParams.get('id');

  // Jika ada ID → ambil keahlian by ID
  if (idParam) {
    const id = Number(idParam);
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

  // Jika tidak ada ID → ambil semua keahlian
  try {
    const semuaKeahlian = await getSemuaKeahlian();

    if (!semuaKeahlian || semuaKeahlian.length === 0) {
      return NextResponse.json(
        standarResponse(false, null, 'Keahlian belum ditambahkan'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      standarResponse(true, {
        keahlian: semuaKeahlian,
        jumlah: semuaKeahlian.length,
      }),
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data keahlian';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// POST keahlian baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newKeahlian = await createKeahlian(body);

    return NextResponse.json(standarResponse(true, newKeahlian), { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menambahkan keahlian';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// PUT keahlian berdasarkan ID (query string)
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
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengupdate keahlian';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}

// DELETE keahlian berdasarkan ID (query string)
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
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menghapus keahlian';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}
