"use client";

import {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx"; // optional: untuk className helper

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Portfolio",
    url: "#portfolio",
    icon: Briefcase,
  },
  {
    title: "Resume",
    url: "#resume",
    icon: FileText,
  },
  {
    title: "Contact",
    url: "#contact",
    icon: Mail,
  },
];

export function AppSidebar() {
  const pathname = usePathname(); // Mendapatkan path sekarang untuk menentukan menu yang aktif

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* Profile Section */}
          <SidebarGroupContent className="flex flex-col items-center py-8 px-4 mb-2 border-b-4">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <Image
                src="/image/foto-saya.jpg" 
                alt="Profile Photo"
                width={128}
                height={128}
                className="object-cover"
                priority 
                loading="eager" 
              />
            </div>

            <h1 className="text-xl font-bold mt-4">Fajar Santoso</h1>
            <p className="text-gray-500">Web Developer</p>
          </SidebarGroupContent>

          {/* Navigation Menu */}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center gap-3 px-4 py-5 transition-colors rounded-md",
                          {
                            "bg-gray-700 text-white font-semibold": isActive,
                            "hover:bg-gray-600 hover:text-white": !isActive,
                          }
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>

          {/* Social Links */}
          <div className="px-4 py-6 flex justify-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
