"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use `next/navigation` for client-side routing

export default function LoadingPage() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading for 3 seconds (you can adjust this duration)
    const timer = setTimeout(() => {
      router.push("/home"); // Redirect to the /home page after loading is finished
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gray-100 flex justify-center items-center"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-20 h-20 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    </motion.div>
  );
}
