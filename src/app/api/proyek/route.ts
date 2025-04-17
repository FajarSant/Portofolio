// app/api/proyek/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { standarResponse } from '@/utils/response';
import { getSemuaProyek, createProyek } from '@/services/proyekService';

// GET semua proyek
export async function GET() {  // Removed req
  try {
    const semuaProyek = await getSemuaProyek();
    if (semuaProyek.length === 0) {
      return NextResponse.json(standarResponse(false, null, 'Proyek belum ditambahkan'), { status: 404 });
    }

    return NextResponse.json(
      standarResponse(true, {
        proyek: semuaProyek,
        jumlahProyek: semuaProyek.length,
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
