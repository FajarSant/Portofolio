import { NextRequest, NextResponse } from 'next/server';
import { standarResponse } from '@/utils/response';
import { createProyek, getProyekById, getSemuaProyek } from '@/services/proyekService';

// Konfigurasi API
export const config = {
  api: {
    bodyParser: true,  // Menggunakan body parser Next.js untuk JSON
  },
};

// GET semua proyek
export async function GET() {
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

// GET proyek berdasarkan ID
export async function GET_BY_ID(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      standarResponse(false, null, 'ID tidak valid'),
      { status: 400 }
    );
  }

  try {
    const proyek = await getProyekById(Number(id));
    if (!proyek) {
      return NextResponse.json(
        standarResponse(false, null, 'Proyek tidak ditemukan'),
        { status: 404 }
      );
    }
    return NextResponse.json(standarResponse(true, proyek));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// POST proyek baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();  // Mengambil data JSON dari request body

    // Destructuring data yang diperlukan dari body
    const { judul, deskripsi, footer, linkSitus, linkGithub, thumbnail } = body;

    // Validasi field wajib
    if (!judul || !deskripsi || !footer || !linkSitus || !linkGithub) {
      return NextResponse.json(
        standarResponse(false, null, 'Field judul, deskripsi, footer, linkSitus, dan linkGithub wajib diisi'),
        { status: 400 }
      );
    }

    // Menyusun objek proyek sesuai dengan model Prisma
    const proyekBaru = {
      judul: judul.toString(),
      deskripsi: deskripsi.toString(),
      footer: footer.toString(),
      linkSitus: linkSitus.toString(),
      linkGithub: linkGithub.toString(),
      thumbnail: thumbnail ? thumbnail.toString() : null,  // Thumbnail adalah link, bisa null jika tidak ada
    };

    // Memanggil fungsi untuk menyimpan proyek baru ke database
    const newProyek = await createProyek(proyekBaru);

    return NextResponse.json(standarResponse(true, newProyek), { status: 201 });

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan saat menambahkan proyek';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}
