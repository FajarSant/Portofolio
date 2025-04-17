// app/api/pesan/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { standarResponse } from '@/utils/response';
import { getSemuaPesan, createPesan } from '@/services/pesanService';

// GET semua pesan
export async function GET() {  // Removed req
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
    const body = await req.json();
    const newPesan = await createPesan(body);
    return NextResponse.json(standarResponse(true, newPesan), { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menambahkan pesan';
    return NextResponse.json(standarResponse(false, null, message), { status: 400 });
  }
}
