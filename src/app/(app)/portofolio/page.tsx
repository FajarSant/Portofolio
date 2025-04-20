import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";

type Proyek = {
  id: number;
  judul: string;
  deskripsi: string;
  footer: string;
  linkSitus: string;
  linkGithub: string;
  dibuatPada: Date;
  thumbnail?: string; // gambar opsional
};

const proyekData: Proyek[] = [
  {
    id: 1,
    judul: "Website Portfolio",
    deskripsi: "Website pribadi yang menampilkan project dan skill saya.",
    footer: "React, Tailwind, Next.js",
    linkSitus: "https://portfolio-keren.vercel.app",
    linkGithub: "https://github.com/username/portfolio",
    dibuatPada: new Date("2024-12-01"),
    thumbnail: "/images/portfolio.jpg", // ganti sesuai file kamu
  },
  {
    id: 2,
    judul: "Sistem Manajemen Tugas",
    deskripsi: "Aplikasi untuk mengatur dan melacak tugas harian.",
    footer: "Next.js, Prisma, PostgreSQL",
    linkSitus: "https://taskmanager-app.vercel.app",
    linkGithub: "https://github.com/username/taskmanager",
    dibuatPada: new Date("2025-01-15"),
    thumbnail: "/images/taskmanager.jpg",
  },
];

const PortfolioPage = () => {
  return (
    <main className="min-h-screen bg-white py-14 px-6">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">🛠️ My Projects</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {proyekData.map((proyek) => (
            <Card
              key={proyek.id}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 bg-white"
            >
              {proyek.thumbnail && (
                <img
                  src={proyek.thumbnail}
                  alt={proyek.judul}
                  className="w-full h-48 object-cover"
                />
              )}

              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{proyek.judul}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {format(proyek.dibuatPada, "dd MMMM yyyy")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">{proyek.deskripsi}</p>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 items-start border-t border-gray-100 pt-4 mt-2">
                <span className="text-xs text-gray-500 italic">{proyek.footer}</span>
                <div className="flex gap-4">
                  <Link
                    href={proyek.linkSitus}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    🌐 Live Site
                  </Link>
                  <Link
                    href={proyek.linkGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-800 hover:underline"
                  >
                    💻 GitHub
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
