import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/20"></div>

      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Team Task Manager
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-2xl text-gray-300 mb-4"
        >
          Built for Ithara AI Full-Stack Assessment
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          A role-based collaboration platform for managing projects, assigning
          tasks, and tracking team productivity with secure authentication and
          modern UI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2 }}
          className="mt-8 text-sm text-gray-500"
        >
          Designed & Developed by Harshad Gangurde
        </motion.div>
      </motion.div>
    </div>
  );
}
