import { IPesan } from '@/types';
import { prisma } from '@/lib/prisma'; // ✅ Ini yang benar

export async function getSemuaPesan() {
  return await prisma.pesan.findMany({
    orderBy: { dibuatPada: 'desc' },
  });
}

export async function getPesanById(id: number) {
  return await prisma.pesan.findUnique({
    where: { id },
  });
}

export async function createPesan(data: IPesan) {
  const existing = await prisma.pesan.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    throw new Error('Email sudah digunakan.');
  }

  return await prisma.pesan.create({
    data,
  });
}

export async function updatePesan(id: number, data: IPesan) {
  return await prisma.pesan.update({
    where: { id },
    data,
  });
}

export async function deletePesan(id: number) {
  return await prisma.pesan.delete({
    where: { id },
  });
}
