// app/api/keahlian/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createKeahlian, getSemuaKeahlian } from '@/services/keahlianService';
import { standarResponse } from '@/utils/response';

// GET semua keahlian
export async function GET() {
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
