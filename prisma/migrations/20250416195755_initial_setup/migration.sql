-- CreateTable
CREATE TABLE "Keahlian" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "footer" TEXT NOT NULL,
    "ikon" TEXT NOT NULL,
    "progres" INTEGER NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Keahlian_pkey" PRIMARY KEY ("id")
);
