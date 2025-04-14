"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

export default function ResumeTemplate() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden p-8 md:p-12 space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/foto-saya.jpg"
              alt="Foto"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-blue-500"
              priority={true}
            />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Fajar Santoso</h1>
            <p className="text-blue-600 text-lg font-medium mt-1">Web Developer</p>
            <div className="mt-4 text-sm text-gray-600 space-y-2">
              <p className="flex items-center gap-2">
                <FaPhone className="text-blue-500" />
                <a
                  href="https://wa.me/6285866436897"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  +62 858-6643-6897
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <a
                  href="mailto:4jar100so@gmail.com"
                  className="hover:underline text-blue-600"
                >
                  4jar100so@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <a
                  href="https://www.google.com/maps?q=Putrojalu,+Girimulyo,+Kec.+Ngargoyoso,+Kabupaten+Karanganyar,+Jawa+Tengah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  Putrojalu, Girimulyo, Kec. Ngargoyoso, Kabupaten Karanganyar,
                  Jawa Tengah
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* About Me */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Tentang Saya</h2>
          <p className="mt-4 text-gray-700 leading-relaxed text-justify">
            Lulusan baru di bidang Pendidikan Teknik Informatika dengan hasrat
            yang kuat dalam IT dan pemrograman. Terampil dalam pengembangan
            aplikasi web dan JavaScript. Seorang pembelajar antusias yang suka
            memecahkan masalah dan menciptakan pengalaman pengguna yang bermakna
            melalui teknologi.
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Pengalaman</h2>
          <div className="mt-6 space-y-6">
            {/* Pengalaman 1 */}
            <div>
              <h3 className="font-semibold text-gray-800">
                Magang Web Developer - Dinas Komunikasi dan Informatika
              </h3>
              <p className="text-sm text-gray-500">Agustus 2023 – November 2023</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>
                  Mengambil berita dari portal berita Karanganyar untuk
                  ditampilkan di website Dinas Komunikasi dan Informatika.
                </li>
                <li>
                  Menganalisis berita dan menilai kata-kata negatif atau positif
                  untuk menilai sentimen sebelum dipublikasikan di website.
                </li>
                <li>
                  Menyimpan dan mengelola berita dengan memberikan kategori yang
                  sesuai untuk tampilan di portal berita.
                </li>
              </ul>
            </div>

            {/* Pengalaman 2 */}
            <div>
              <h3 className="font-semibold text-gray-800">
                Web Developer - Website Bursa Kerja SMKN Ngargoyoso
              </h3>
              <p className="text-sm text-gray-500">Maret 2024 – September 2024</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>
                  Membangun website bursa kerja untuk SMKN Ngargoyoso dengan
                  fitur manajemen siswa/alumni dan manajemen lowongan pekerjaan.
                </li>
                <li>
                  Menambahkan fitur tampilan responsif untuk memastikan website
                  berfungsi baik di perangkat desktop, tablet, dan mobile.
                </li>
                <li>
                  Mengembangkan tampilan terbaru yang modern dan user-friendly
                  untuk meningkatkan pengalaman pengguna.
                </li>
              </ul>
            </div>

            {/* Pengalaman 3 */}
            <div>
              <h3 className="font-semibold text-gray-800">
                Freelance Frontend Developer - AneCma ID
              </h3>
              <p className="text-sm text-gray-500">September 2024 – Maret 2025</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>
                  Mengembangkan aplikasi mobile AneCma ID sebagai frontend
                  menggunakan React Native.
                </li>
                <li>
                  Menyediakan tampilan ramah pengguna dengan antarmuka yang
                  intuitif.
                </li>
                <li>
                  Menambahkan fitur pengingat minum obat untuk pengguna dengan
                  kondisi anemia serta menyediakan tampilan edukasi terkait
                  kesehatan.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Pendidikan</h2>
          <div className="mt-4 space-y-4">
            {/* Pendidikan 1 */}
            <div>
              <h3 className="font-semibold text-gray-800">SMKN Ngargoyoso - TBSM</h3>
              <p className="text-sm text-gray-500">2017 – 2020</p>
            </div>

            {/* Pendidikan 2 */}
            <div>
              <h3 className="font-semibold text-gray-800">
                Sarjana Pendidikan Teknik Informatika
              </h3>
              <p className="text-sm text-gray-500">
                Universitas Muhammadiyah Surakarta | 2020 – 2025
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Keahlian</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Keahlian Teknis</h4>
              <ul className="space-y-1">
                <li>• JavaScript / HTML / CSS</li>
                <li>• ReactJS</li>
                <li>• NextJS</li>
                <li>• NuxtJS</li>
                <li>• Prisma</li>
                <li>• Database SQL</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Keahlian Tambahan</h4>
              <ul className="space-y-1">
                <li>• Komunikasi</li>
                <li>• Kerja Tim</li>
                <li>• Berpikir Kritis</li>
                <li>• Pemecahan Masalah</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-8 border-t">
          <div className="flex gap-5 text-2xl text-blue-600">
            {/* GitHub */}
            <a
              href="https://github.com/FajarSant"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800"
            >
              <FaGithub />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/fajar-santoso-a33b50277/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800"
            >
              <FaLinkedin />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/fajarsantf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800"
            >
              <FaInstagram />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@shinxyc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800"
            >
              <FaTiktok />
            </a>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
