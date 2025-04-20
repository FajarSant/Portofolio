"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validasi input
    if (!nama || !email || !pesan) {
      setError("Semua kolom harus diisi!");
      setIsLoading(false);
      return;
    }

    // Simulasi pengiriman data (misalnya melalui API)
    try {
      console.log("Mengirim pesan:", { nama, email, pesan });

      setNama("");
      setEmail("");
      setPesan("");

      alert("Pesan berhasil dikirim!");
    } catch (err) {
      console.error("Error:", err);
      setError("Terjadi kesalahan saat mengirim pesan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 md:px-10 py-12">
      <div className="max-w-7xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          📬 Kontak Saya
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 w-full px-4 md:px-8">
          {/* === KONTEN UTAMA (3/4) === */}
          <div className="lg:basis-3/4 space-y-12">
            {/* === INFO KONTAK === */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📇 Informasi Kontak
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>📍 Alamat:</strong>{" "}
                  <a
                    href="https://www.google.com/maps?q=Putrojalu,+Girimulyo,+Kec.+Ngargoyoso,+Kabupaten+Karanganyar,+Jawa+Tengah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                  >
                    Putrojalu, Girimulyo, Kec. Ngargoyoso, Kabupaten Karanganyar,
                    Jawa Tengah
                  </a>
                </li>
                <li>
                  <strong>📞 Nomor HP:</strong>{" "}
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    +62 812 3456 7890
                  </a>
                </li>
                <li>
                  <strong>📧 Email:</strong>{" "}
                  <a
                    href="mailto:emailkamu@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    emailkamu@gmail.com
                  </a>
                </li>
                <li>
                  <strong>💼 LinkedIn:</strong>{" "}
                  <a
                    href="https://linkedin.com/in/username"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    linkedin.com/in/username
                  </a>
                </li>
                <li>
                  <strong>💻 GitHub:</strong>{" "}
                  <a
                    href="https://github.com/username"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    github.com/username
                  </a>
                </li>
                <li>
                  <strong>📱 Instagram:</strong>{" "}
                  <a
                    href="https://instagram.com/username"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    @username
                  </a>
                </li>
              </ul>
            </div>
            {/* === FORM PESAN === */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 space-y-5"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Tinggalkan Pesan
              </h2>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama kamu"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@kamu.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pesan
                </label>
                <Textarea
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  placeholder="Tulis pesan atau komentar kamu di sini..."
                  className="min-h-[120px] w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300 disabled:opacity-50"
              >
                {isLoading ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </div>

          {/* === KOMENTAR SIDEBAR (1/4) === */}
          <aside className="lg:basis-1/4 w-full">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                💬 Komentar
              </h2>
              <ul className="space-y-4 max-h-[550px] overflow-y-auto">
                {dummyKomentar.map((komentar) => (
                  <li
                    key={komentar.id}
                    className="border border-gray-100 rounded-lg p-4 bg-gray-50 hover:shadow-sm transition"
                  >
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {komentar.nama}
                    </p>
                    <p className="text-sm text-gray-600">{komentar.isi}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default KontakPage;
