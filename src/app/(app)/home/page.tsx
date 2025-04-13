'use client';

import ImageCardSwiper from '@/components/ImageCardSwiper';
import TypingText from '@/components/TypingText';
import { motion } from 'framer-motion'; // Import framer motion

const images = [
  '/images/foto-saya.jpg',
  '/images/foto-saya.jpg',
  '/images/foto-saya.jpg',
  '/images/foto-saya.jpg',
  '/images/foto-saya.jpg',
  '/images/foto-saya.jpg',
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 md:px-10 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Kiri: Deskripsi Diri */}
        <motion.div 
          className="space-y-8" 
          initial={{ opacity: 0, y: 50 }} // Animasi awal
          animate={{ opacity: 1, y: 0 }} // Animasi akhir
          transition={{ duration: 1 }} // Durasi animasi
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight tracking-tight">
            Halo, saya <br />
            <TypingText
              words={['Fajar Santoso']}
              loop={1}
              cursorStyle="|"
              className="text-blue-600"
            />
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-gray-700 tracking-wide">
            <TypingText
              words={['Web Developer', 'UI/UX Designer', 'Frontend Developer']}
              loop={true}
              cursorStyle="_"
              typeSpeed={30}
              deleteSpeed={40}
              delaySpeed={2000}
              className="inline-block"
            />
          </p>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl text-justify">
            Saya adalah seorang developer yang passionate dengan desain UI/UX,
            animasi interaktif, dan pengembangan aplikasi web modern. Saya
            memiliki pengalaman dalam mengembangkan aplikasi web yang responsif
            dan user-friendly, serta fokus pada penerapan desain yang intuitif
            dan pengalaman pengguna yang menyenangkan. Berpengalaman dalam
            menggunakan teknologi terkini seperti{" "}
            <strong className="text-blue-600">React, Next.js,</strong> dan{" "}
            <strong className="text-blue-600">Tailwind CSS</strong>. Saya selalu
            berusaha untuk menciptakan aplikasi yang tidak hanya berfungsi
            dengan baik, tetapi juga memukau secara visual dan memberikan
            pengalaman yang seamless bagi pengguna.
          </p>
        </motion.div>

        {/* Kanan: Swiper Foto */}
        <motion.div 
          className="flex justify-center md:justify-end" 
          initial={{ opacity: 0, x: 50 }} // Animasi awal
          animate={{ opacity: 1, x: 0 }}  // Animasi akhir
          transition={{ duration: 1 }} // Durasi animasi
        >
          <div className="overflow-hidden p-4 w-full max-w-md sm:max-w-lg">
            <ImageCardSwiper images={images} />
          </div>
        </motion.div>
      </div>
    </main>
  );
}
