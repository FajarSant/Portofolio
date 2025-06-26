// app/portofolio/[id]/page.tsx
"use client"
import React from "react";
import { format } from "date-fns";
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import { MdVisibility } from "react-icons/md"; // Eye (Visibility) Icon
import Image from "next/image"; // Next.js Image component
import { useRouter } from "next/navigation"; // Router for navigation handling

type Proyek = {
  id: string;
  judul: string;
  deskripsi: string;
  deskripsiSingkat: string;
  footer: string;
  linkSitus: string;
  linkGithub: string;
  dibuatPada: string;
  thumbnail?: string;
};

const ShowPage = async ({ params }: { params: { id: string } }) => {
  // Fetch the project data from the public directory (relative to the base URL)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/proyekData.json`);
  const data = await res.json();

  // Find the project by its ID
  const proyek = data.projects.find((p: Proyek) => p.id === params.id);

  // If the project is not found, return null or show a 404 page
  if (!proyek) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Project not found!</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-14 px-6">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          🛠️ {proyek.judul}
        </h1>
        <div className="flex flex-col items-center gap-8">
          {proyek.thumbnail && (
            <Image
              src={proyek.thumbnail}
              alt={proyek.judul}
              width={800}
              height={500}
              className="w-full object-cover rounded-xl"
              priority
            />
          )}

          <div className="max-w-3xl w-full text-center">
            <p className="text-sm text-gray-500">
              {format(new Date(proyek.dibuatPada), "dd MMMM yyyy")}
            </p>
            <p className="text-lg text-gray-700 mt-6">{proyek.deskripsi}</p>

            <div className="flex flex-col items-center mt-8 gap-4">
              <a
                href={proyek.linkSitus}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-600 hover:underline transition-all duration-300 transform hover:scale-110"
              >
                <MdVisibility className="w-6 h-6 transition-all duration-300 transform hover:text-blue-600" />
                Visit Site
              </a>

              <a
                href={proyek.linkGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-800 hover:underline transition-all duration-300 transform hover:scale-110"
              >
                <FaGithub className="w-6 h-6 transition-all duration-300 transform hover:text-gray-800" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowPage;
