import { NextRequest, NextResponse } from 'next/server';
import { getPesanById, getSemuaPesan, updatePesan, deletePesan } from '@/services/pesanService';
import { standarResponse } from '@/utils/response';
import { IPesan } from '@/types';

export async function GET(req: NextRequest, { params }: { params?: { id: string } }) {
  if (params?.id) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
    }

    try {
      const pesan = await getPesanById(id);
      if (!pesan) {
        return NextResponse.json(standarResponse(false, null, 'Data tidak ditemukan'), { status: 404 });
      }
      return NextResponse.json(standarResponse(true, pesan));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(standarResponse(false, null, error.message), { status: 400 });
      }
      return NextResponse.json(standarResponse(false, null, 'Terjadi kesalahan internal'), { status: 500 });
    }
  }

  try {
    const semuaPesan = await getSemuaPesan();
    if (semuaPesan.length === 0) {
      return NextResponse.json(standarResponse(false, null, 'Pesan belum tersedia'), { status: 200 });
    }

    return NextResponse.json(standarResponse(true, { pesan: semuaPesan, jumlahPesan: semuaPesan.length }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(standarResponse(false, null, error.message), { status: 400 });
    }
    return NextResponse.json(standarResponse(false, null, 'Terjadi kesalahan internal'), { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    const body: IPesan = await req.json();
    const updated = await updatePesan(id, body);
    return NextResponse.json(standarResponse(true, updated));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(standarResponse(false, null, error.message), { status: 400 });
    }
    return NextResponse.json(standarResponse(false, null, 'Terjadi kesalahan internal'), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 });
  }

  try {
    await deletePesan(id);
    return NextResponse.json(standarResponse(true, null), { status: 204 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(standarResponse(false, null, error.message), { status: 400 });
    }
    return NextResponse.json(standarResponse(false, null, 'Terjadi kesalahan internal'), { status: 500 });
  }
}
