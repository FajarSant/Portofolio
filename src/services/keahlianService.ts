import { prisma } from '@/lib/prisma'; 
import { Keahlian } from '@prisma/client'; 

// Create Keahlian
export async function createKeahlian(data: Omit<Keahlian, 'id' | 'dibuatPada'>) {
  return await prisma.keahlian.create({
    data,
  });
}

// Get All Keahlian
export async function getSemuaKeahlian() {
  return await prisma.keahlian.findMany({
    orderBy: { dibuatPada: 'desc' },
  });
}

// Get Keahlian by ID
export async function getKeahlianById(id: number) {
  return await prisma.keahlian.findUnique({
    where: { id },
  });
}

// Update Keahlian by ID
export async function updateKeahlian(id: number, data: Partial<Omit<Keahlian, 'id' | 'dibuatPada'>>) {
  return await prisma.keahlian.update({
    where: { id },
    data,
  });
}

// Delete Keahlian by ID
export async function deleteKeahlian(id: number) {
  return await prisma.keahlian.delete({
    where: { id },
  });
}
