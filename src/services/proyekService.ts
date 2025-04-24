import { prisma } from '@/lib/prisma'; // Sesuaikan dengan lokasi prisma client Anda
import { IProyek } from '@/types';  // Sesuaikan dengan interface IProyek

export async function getSemuaProyek() {
  return await prisma.proyek.findMany({
    orderBy: { dibuatPada: 'desc' }, // Urutkan berdasarkan waktu pembuatan
  });
}

export async function getProyekById(id: number) {
  return await prisma.proyek.findUnique({
    where: { id },
  });
}

export async function createProyek(data: IProyek) {
  return await prisma.proyek.create({
    data,
  });
}

export async function updateProyek(id: number, updatedData: { judul: string, deskripsi: string, footer: string, linkSitus: string, linkGithub: string, thumbnail?: string | null }) {
  return prisma.proyek.update({
    where: { id },
    data: updatedData,
  });
}

export async function deleteProyek(id: number) {
  return await prisma.proyek.delete({
    where: { id },
  });
}
