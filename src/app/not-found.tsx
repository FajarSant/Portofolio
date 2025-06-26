'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f4ff] via-[#e0e7ff] to-[#dbeafe] px-6 text-center">
      <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-lg">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! Sepertinya halaman yang kamu tuju tidak tersedia. Coba kembali ke beranda.
      </p>

      <Link href="/">
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300">
          <FaArrowLeft className="text-sm" />
          Kembali ke Beranda
        </button>
      </Link>
    </main>
  );
}
