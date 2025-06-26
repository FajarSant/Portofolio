"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";  // Use Next.js Link component for navigation
import { format } from "date-fns";
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import { MdVisibility } from "react-icons/md"; // Eye (Visibility) Icon
import Image from "next/image"; // Use Next.js Image component

type Proyek = {
  id: string; // Changed to string since the ids are now strings in the updated JSON
  judul: string;
  deskripsi: string;
  deskripsiSingkat: string; // Add short description type
  footer: string;
  linkSitus: string;
  linkGithub: string;
  dibuatPada: string; // Date format as string
  thumbnail?: string;
};

const PortfolioPage = () => {
  const [proyekData, setProyekData] = useState<Proyek[]>([]);

  // Fetch JSON data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/proyekData.json');
      const data = await response.json();
      setProyekData(data.projects);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-14 px-6">
      <section className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          🛠️ My Projects
        </h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {proyekData.map((proyek) => (
            <div key={proyek.id} className="cursor-pointer">
              <Card
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translate-y-1 border border-gray-200 bg-white"
              >
                {proyek.thumbnail && (
                  <Image
                    src={proyek.thumbnail}
                    alt={proyek.judul}
                    width={500}  // Adjust the width as per your design needs
                    height={300} // Adjust the height as per your design needs
                    className="w-full h-48 object-cover"
                    priority // Use priority for critical images
                  />
                )}

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {proyek.judul}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {format(new Date(proyek.dibuatPada), "dd MMMM yyyy")}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {proyek.deskripsiSingkat} {/* Use short description here */}
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 items-start border-t border-gray-100 pt-4 mt-2">
                  <span className="text-xs text-gray-500 italic">
                    {proyek.footer}
                  </span>
                  <div className="flex gap-6 items-center">
                    {/* Main link for the project page with a larger button */}
                    <Link
                      href={`/portofolio/${proyek.id}`}
                      passHref
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline transition-all duration-300 transform hover:scale-110"
                    >
                      <MdVisibility className="w-6 h-6 transition-all duration-300 transform hover:text-blue-600" />
                      <button className="text-sm text-blue-600 hover:underline font-medium transition-all duration-300 transform hover:scale-110">
                        Lihat Detail
                      </button>
                    </Link>

                    {/* External link to the project website */}
                    <a
                      href={proyek.linkSitus}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:underline transition-all duration-300 transform hover:scale-110"
                    >
                      <MdVisibility className="w-6 h-6 transition-all duration-300 transform hover:text-blue-600" />
                      Visit Site
                    </a>

                    {/* External link to GitHub */}
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
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PortfolioPage;
