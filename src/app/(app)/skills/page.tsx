"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { IoLogoFigma, IoLogoFirebase, IoLogoVercel } from "react-icons/io5";

import {
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const [selectedTab, setSelectedTab] = useState<"tech" | "tools">("tech");

  const techStack = [
    {
      title: "HTML",
      description: "Pengembangan web dengan HTML.",
      content:
        "Mempunyai pengalaman dalam strukturisasi halaman web menggunakan HTML5.",
      footer: "Bahasa Pemograman",
      icon: <SiHtml5 className="text-orange-500 w-6 h-6" />,
      progress: 90, // Progress untuk HTML
    },
    {
      title: "JavaScript",
      description: "Pengembangan web front-end dengan JavaScript.",
      content:
        "Mempunyai pengalaman dalam pengembangan aplikasi web dinamis dan interaktif.",
      footer: "Bahasa Pemograman",
      icon: <SiJavascript className="text-yellow-500 w-6 h-6" />,
      progress: 80, // Progress untuk JavaScript
    },
    {
      title: "React",
      description: "Pengembangan aplikasi dengan React.js.",
      content:
        "Menguasai konsep React seperti hooks, state management, dan komponen reusable.",
      footer: "React Developer",
      icon: <FaReact className="text-blue-500 w-6 h-6" />,
      progress: 70, // Progress untuk React
    },
    {
      title: "React Native",
      description: "Pengembangan aplikasi mobile menggunakan React Native.",
      content:
        "Membangun aplikasi mobile dengan React Native untuk iOS dan Android.",
      footer: "Mobile Developer",
      icon: <FaReact className="text-blue-500 w-6 h-6" />,
      progress: 60, // Progress untuk React Native
    },
    {
      title: "Next.js",
      description:
        "Framework React untuk pengembangan aplikasi dengan server-side rendering.",
      content:
        "Membangun aplikasi web yang cepat dan SEO-friendly dengan Next.js.",
      footer: "Next.js Developer",
      icon: <SiNextdotjs className="text-black w-6 h-6" />,
      progress: 85, // Progress untuk Next.js
    },
    {
      title: "NestJS",
      description:
        "Backend development dengan NestJS, framework untuk Node.js.",
      content:
        "Membangun aplikasi server-side menggunakan arsitektur modular dan TypeScript.",
      footer: "Backend Developer",
      icon: <SiNestjs className="text-e50000 w-6 h-6" />,
      progress: 75, // Progress untuk NestJS
    },
    {
      title: "Tailwind CSS",
      description: "Desain cepat dan responsif menggunakan utility classes.",
      content: "Mendesain antarmuka modern dengan performa optimal.",
      footer: "Frontend Developer",
      icon: <SiTailwindcss className="text-sky-500 w-6 h-6" />,
      progress: 90, // Progress untuk Tailwind CSS
    },
    {
      title: "Node.js",
      description: "Backend development dengan Node.js dan Express.",
      content: "Membangun REST API dan integrasi database MongoDB.",
      footer: "Backend Developer",
      icon: <FaNodeJs className="text-green-600 w-6 h-6" />,
      progress: 80, // Progress untuk Node.js
    },
  ];

  const tools = [
    {
      title: "Git",
      description: "Version control untuk pengembangan tim.",
      content: "Menggunakan Git & GitHub untuk kolaborasi dan deployment.",
      footer: "Versioning",
      icon: <FaGitAlt className="text-red-500 w-6 h-6" />,
      progress: 95, // Progress untuk Git
    },
    {
      title: "PostgreSQL",
      description: "Database relational yang kuat untuk aplikasi skala besar.",
      content:
        "Menggunakan PostgreSQL untuk pengelolaan data yang aman dan terstruktur.",
      footer: "Database Tool",
      icon: <SiPostgresql className="text-blue-600 w-6 h-6" />,
      progress: 70, // Progress untuk PostgreSQL
    },
    {
      title: "Firebase",
      description: "Platform untuk pengembangan aplikasi mobile dan web.",
      content: "Menggunakan Firebase untuk autentikasi, database, dan hosting.",
      footer: "Realtime Backend",
      icon: <IoLogoFirebase className="text-yellow-500 w-6 h-6" />,
      progress: 80, // Progress untuk Firebase
    },
    {
      title: "Prisma",
      description: "ORM (Object-Relational Mapping) untuk database di Node.js.",
      content:
        "Menggunakan Prisma untuk berinteraksi dengan database secara efisien.",
      footer: "ORM Tool",
      icon: <SiPrisma className="text-purple-600 w-6 h-6" />,
      progress: 60, // Progress untuk Prisma
    },
    {
      title: "Figma",
      description: "Desain antarmuka dan prototyping.",
      content: "Bekerja dengan tim UI/UX menggunakan Figma.",
      footer: "Design Tool",
      icon: <IoLogoFigma className="text-purple-500 w-6 h-6" />,
      progress: 85, // Progress untuk Figma
    },
    {
      title: "Vercel",
      description: "Platform untuk deployment aplikasi berbasis Next.js.",
      content:
        "Menggunakan Vercel untuk hosting dan deployment aplikasi Next.js.",
      footer: "Deployment Tool",
      icon: <IoLogoVercel className="text-black w-6 h-6" />,
      progress: 90, // Progress untuk Vercel
    },
  ];

  const displayedSkills = selectedTab === "tech" ? techStack : tools;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4 md:px-10 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-700">My Skills</h1>
        </div>

        {/* Accordion Grid */}
        <div className="p-6 bg-white shadow-xl rounded-3xl">
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setSelectedTab("tech")}
              className={`px-5 py-2 rounded-full font-semibold transition duration-200 shadow-lg transform ${
                selectedTab === "tech"
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-100"
              }`}
            >
              Tech Stack
            </button>
            <button
              onClick={() => setSelectedTab("tools")}
              className={`px-5 py-2 rounded-full font-semibold transition duration-200 shadow-lg transform ${
                selectedTab === "tools"
                  ? "bg-blue-600 text-white scale-105"
                  : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-100"
              }`}
            >
              Tools
            </button>
          </div>

          {/* Accordion Component */}
          <Accordion type="single" collapsible className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedSkills.map((skill, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="w-full"
                >
                  <AccordionTrigger className="w-90 px-4 py-3 bg-blue-50 rounded-xl shadow-md hover:bg-blue-100 transition">
                    <div className="flex items-center space-x-3">
                      {skill.icon}
                      <span className="text-lg font-medium text-blue-800">
                        {skill.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 shadow-inner mt-2 min-h-[180px] flex flex-col justify-between rounded-xl border border-blue-200">
                      <div>
                        <p className="text-gray-500 mb-2">
                          {skill.description}
                        </p>
                        <p className="text-gray-700 mb-3">{skill.content}</p>
                      </div>
                      <p className="text-sm text-center text-blue-600 italic mt-auto">
                        {skill.footer}
                      </p>
                      <div>
                        <span>{skill.progress}%</span>
                        <Progress
                          value={skill.progress}
                          className="h-2 bg-blue-100 [&>div]:bg-blue-600 rounded-full"
                        />
                      </div>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default Skills;
