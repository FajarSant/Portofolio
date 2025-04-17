import { NextResponse } from 'next/server'
import { getSemuaPesan } from '@/services/pesanService'
import { standarResponse } from '@/utils/response'

// GET semua pesan
export async function GET() {  // Menghapus 'req' karena tidak digunakan
  try {
    const semuaPesan = await getSemuaPesan()
    if (semuaPesan.length === 0) {
      return NextResponse.json(standarResponse(false, null, 'Pesan belum tersedia'), { status: 200 })
    }

    return NextResponse.json(
      standarResponse(true, {
        pesan: semuaPesan,
        jumlahPesan: semuaPesan.length,
      })
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal'
    return NextResponse.json(standarResponse(false, null, message), { status: 500 })
  }
}
