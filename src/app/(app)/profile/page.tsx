'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';

export default function ResumeTemplate() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden p-8 md:p-10 space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/images/foto-saya.jpg"
              alt="Foto"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-blue-600"
              priority={true} // For better performance by preloading the image
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Muhammed All</h1>
            <p className="text-blue-600 text-lg font-medium">Full-stack Developer</p>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <FaPhone className="text-blue-500" /> +62 852-xxxx-xxxx
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> muhammedall@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <a
                  href="https://www.google.com/maps?q=Jl.+Fader+Karma+No.26,+Jakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  Jl. Fader Karma No.26, Jakarta Timur
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* About Me */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">About Me</h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-justify">
            Recent graduate in Information Engineering with a strong passion for IT and programming.
            Skilled in Java and web application development. Enthusiastic learner who loves solving problems and
            creating meaningful user experiences through tech.
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Experience</h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">Web Developer Intern - XYZ Company</h3>
              <p className="text-sm text-gray-500">March 2019 – May 2019</p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Built responsive web applications using HTML, CSS, JS</li>
                <li>Monitored website analytics and traffic behavior</li>
                <li>Collaborated with design team on UI improvements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Education</h2>
          <div className="mt-4 space-y-2">
            <div>
              <h3 className="font-semibold">Bachelor's in Information Engineering</h3>
              <p className="text-sm text-gray-500">Gojah Raya University | 2016 – 2020</p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Technical Skills</h4>
              <ul className="space-y-1">
                <li>• JavaScript / HTML / CSS</li>
                <li>• React / Next.js</li>
                <li>• PHP / MySQL</li>
                <li>• Java</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Additional Skills</h4>
              <ul className="space-y-1">
                <li>• Communication</li>
                <li>• Teamwork</li>
                <li>• Critical thinking</li>
                <li>• Problem solving</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Social & Download */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t">
          <div className="flex gap-5 text-xl text-blue-600">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
              <FaLinkedin />
            </a>
          </div>

          <a
            href="/files/CV-MuhammedAll.pdf"
            download
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition"
          >
            <FaDownload className="mr-2" /> Download CV
          </a>
        </section>
      </motion.div>
    </div>
  );
}
