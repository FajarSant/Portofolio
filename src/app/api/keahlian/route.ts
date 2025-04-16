import { NextRequest, NextResponse } from 'next/server';
import { createKeahlian, getKeahlianById, getSemuaKeahlian, updateKeahlian, deleteKeahlian } from '@/services/keahlianService';
import { standarResponse } from '@/utils/response';  // Pastikan ini mengarah ke standarResponse yang telah Anda buat

// GET method to fetch all keahlian or a specific keahlian by ID
export async function GET(req: NextRequest, { params }: { params?: { id: string } }) {
  if (params?.id) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
    }

    const keahlian = await getKeahlianById(id);
    if (!keahlian) {
      return NextResponse.json(standarResponse(false, null, 'Keahlian tidak ditemukan'), { status: 404 });
    }

    return NextResponse.json(standarResponse(true, keahlian));
  }

  const semuaKeahlian = await getSemuaKeahlian();

  // Menambahkan pengecekan apakah data kosong
  if (semuaKeahlian.length === 0) {
    return NextResponse.json(standarResponse(false, null, 'Keahlian belum ditambahkan'), { status: 404 });
  }

  // Menambahkan jumlah keahlian
  return NextResponse.json(
    standarResponse(true, {
      keahlian: semuaKeahlian,
      jumlah: semuaKeahlian.length, // Menambahkan jumlah data keahlian
    })
  );
}

// POST method to create new keahlian
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newKeahlian = await createKeahlian(body);
    return NextResponse.json(standarResponse(true, newKeahlian), { status: 201 });
  } catch (error) {
    return NextResponse.json(standarResponse(false, null, error instanceof Error ? error.message : 'Terjadi kesalahan'), { status: 400 });
  }
}

// PUT method to update keahlian by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedKeahlian = await updateKeahlian(id, body);
    return NextResponse.json(standarResponse(true, updatedKeahlian));
  } catch (error) {
    return NextResponse.json(standarResponse(false, null, error instanceof Error ? error.message : 'Terjadi kesalahan'), { status: 400 });
  }
}

// DELETE method to delete keahlian by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteKeahlian(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    return NextResponse.json(standarResponse(false, null, error instanceof Error ? error.message : 'Terjadi kesalahan'), { status: 400 });
  }
}
