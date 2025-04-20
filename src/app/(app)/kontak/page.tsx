"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";

type Komentar = {
  id: number;
  nama: string;
  isi: string;
};

const dummyKomentar: Komentar[] = [
  { id: 1, nama: "Andi", isi: "Website kamu keren banget!" },
  { id: 2, nama: "Budi", isi: "Sukses terus ya!" },
  { id: 3, nama: "Sari", isi: "Tampilannya clean dan nyaman dilihat." },
];

const KontakPage = () => {
  return (
    <main className="h-full w-full bg-gradient-to-b from-white to-gray-50 py-12">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">📬 Kontak Saya</h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full px-4 md:px-8">
        {/* === KONTEN UTAMA (3/4) === */}
        <div className="lg:basis-3/4 space-y-12">
          {/* === FORM PESAN === */}
          <form className="bg-white border border-gray-200 rounded-xl shadow-md p-6 space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Tinggalkan Pesan</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                type="text"
                placeholder="Nama kamu"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="email@kamu.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
              <Textarea
                placeholder="Tulis pesan atau komentar kamu di sini..."
                className="min-h-[120px] w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
            >
              Kirim Pesan
            </button>
          </form>

          {/* === INFO KONTAK === */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📇 Informasi Kontak</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>📍 Alamat:</strong> Jl. Merpati No. 123, Jakarta Selatan, Indonesia</li>
              <li><strong>📞 Nomor HP:</strong> +62 812 3456 7890</li>
              <li><strong>📧 Email:</strong> <a href="mailto:emailkamu@gmail.com" className="text-blue-600 hover:underline">emailkamu@gmail.com</a></li>
              <li><strong>💼 LinkedIn:</strong> <a href="https://linkedin.com/in/username" target="_blank" className="text-blue-600 hover:underline">linkedin.com/in/username</a></li>
              <li><strong>💻 GitHub:</strong> <a href="https://github.com/username" target="_blank" className="text-blue-600 hover:underline">github.com/username</a></li>
              <li><strong>📱 Instagram:</strong> <a href="https://instagram.com/username" target="_blank" className="text-blue-600 hover:underline">@username</a></li>
            </ul>
          </div>
        </div>

        {/* === KOMENTAR SIDEBAR (1/4) === */}
        <aside className="lg:basis-1/4 w-full">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">💬 Komentar</h2>
            <ul className="space-y-4 max-h-[550px] overflow-y-auto">
              {dummyKomentar.map((komentar) => (
                <li
                  key={komentar.id}
                  className="border border-gray-100 rounded-lg p-4 bg-gray-50 hover:shadow-sm transition"
                >
                  <p className="text-sm font-medium text-gray-800 mb-1">{komentar.nama}</p>
                  <p className="text-sm text-gray-600">{komentar.isi}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default KontakPage;
