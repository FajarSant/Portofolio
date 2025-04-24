import { NextRequest, NextResponse } from 'next/server';
import { standarResponse } from '@/utils/response';
import { getProyekById, updateProyek, deleteProyek } from '@/services/proyekService';

interface ProyekFields {
  judul: string;
  deskripsi: string;
  footer: string;
  linkSitus: string;
  linkGithub: string;
  thumbnail?: string;
}

// GET proyek berdasarkan ID
export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID proyek tidak valid. Pastikan ID berupa angka.'), { status: 400 });
  }

  try {
    const proyek = await getProyekById(Number(id));
    if (!proyek) {
      return NextResponse.json(standarResponse(false, null, `Proyek dengan ID ${id} tidak ditemukan.`), { status: 404 });
    }
    return NextResponse.json(standarResponse(true, proyek));
  } catch (error) {
    const message = error instanceof Error
      ? `Gagal mengambil data proyek. Pesan kesalahan: ${error.message}`
      : 'Terjadi kesalahan tidak terduga saat mengambil data proyek.';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// PUT (update) proyek berdasarkan ID
export async function PUT(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(standarResponse(false, null, 'ID proyek tidak valid. Gunakan angka yang benar.'), { status: 400 });
  }

  try {
    const body = await req.json();

    const { judul, deskripsi, footer, linkSitus, linkGithub, thumbnail }: ProyekFields = body;

    if (!judul || !deskripsi || !footer || !linkSitus || !linkGithub) {
      return NextResponse.json(
        standarResponse(false, null, 'Field judul, deskripsi, footer, linkSitus, dan linkGithub wajib diisi.'),
        { status: 400 }
      );
    }

    // Cek apakah proyek ada sebelum update
    const existingProyek = await getProyekById(Number(id));
    if (!existingProyek) {
      return NextResponse.json(
        standarResponse(false, null, `Proyek dengan ID ${id} tidak ditemukan.`),
        { status: 404 }
      );
    }

    const updatedProyek = {
      judul,
      deskripsi,
      footer,
      linkSitus,
      linkGithub,
      thumbnail: thumbnail || null,
    };

    const proyekBaru = await updateProyek(Number(id), updatedProyek);

    return NextResponse.json(standarResponse(true, proyekBaru), { status: 200 });
  } catch (error) {
    const message = error instanceof Error
      ? `Gagal memperbarui proyek. Pesan kesalahan: ${error.message}`
      : 'Terjadi kesalahan saat memperbarui proyek.';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}

// DELETE proyek berdasarkan ID
export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const id = pathname.split('/').pop();

  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      standarResponse(false, null, 'ID proyek tidak valid. Harap masukkan ID numerik.'),
      { status: 400 }
    );
  }

  try {
    // Ambil proyek terlebih dahulu untuk ditampilkan nanti
    const proyek = await getProyekById(Number(id));

    if (!proyek) {
      return NextResponse.json(
        standarResponse(false, null, `Proyek dengan ID ${id} tidak ditemukan.`),
        { status: 404 }
      );
    }

    // Hapus proyek setelah dipastikan ada
    await deleteProyek(Number(id));

    return NextResponse.json(
      standarResponse(true, proyek, `Proyek dengan ID ${id} berhasil dihapus.`),
      { status: 200 }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? `Gagal menghapus proyek. Pesan kesalahan: ${error.message}`
        : 'Terjadi kesalahan saat mencoba menghapus proyek.';
    return NextResponse.json(standarResponse(false, null, message), { status: 500 });
  }
}
