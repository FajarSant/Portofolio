import { NextRequest, NextResponse } from 'next/server';
import { createProyek, getProyekById, getSemuaProyek, updateProyek, deleteProyek } from '@/services/proyekService';
import { standarResponse } from '@/utils/response';  // Sesuaikan dengan lokasi standarResponse

// GET method to fetch all proyek or a specific proyek by ID
export async function GET(req: NextRequest, { params }: { params?: { id: string } }) {
  if (params?.id) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
    }

    const proyek = await getProyekById(id);
    if (!proyek) {
      return NextResponse.json(standarResponse(false, null, 'Proyek tidak ditemukan'), { status: 404 });
    }

    return NextResponse.json(standarResponse(true, proyek));
  }

  const semuaProyek = await getSemuaProyek();

  if (semuaProyek.length === 0) {
    return NextResponse.json(standarResponse(false, null, 'Proyek belum ditambahkan'), { status: 404 });
  }

  return NextResponse.json(
    standarResponse(true, {
      proyek: semuaProyek,
      jumlah: semuaProyek.length,  // Menambahkan jumlah proyek
    })
  );
}

// POST method to create new proyek
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProyek = await createProyek(body);
    return NextResponse.json(standarResponse(true, newProyek), { status: 201 });
  } catch (error) {
    return NextResponse.json(standarResponse(false, null, error instanceof Error ? error.message : 'Terjadi kesalahan'), { status: 400 });
  }
}

// PUT method to update proyek by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body = await req.json();
    const updatedProyek = await updateProyek(id, body);
    return NextResponse.json(standarResponse(true, updatedProyek));
  } catch (error) {
    return NextResponse.json(standarResponse(false, null, error instanceof Error ? error.message : 'Terjadi kesalahan'), { status: 400 });
  }
}

// DELETE method to delete proyek by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deleteProyek(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error) {
    return NextResponse.json(standarResponse(false, null, error instanceof Error ? error.message : 'Terjadi kesalahan'), { status: 400 });
  }
}
