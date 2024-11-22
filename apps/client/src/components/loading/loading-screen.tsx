'use client';

import logo from '@/assets/logo.png';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

const LoadingScreen = ({ fullScreen = false, text = 'Loading...' }: LoadingProps) => {
  const containerClassName = fullScreen
    ? 'fixed inset-0 bg-background/80 backdrop-blur-sm'
    : 'w-full';

  return (
    <div
      className={`${containerClassName} flex flex-col items-center justify-center min-h-[200px]`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16 sm:w-24 sm:h-24">
          <Image
            src={logo}
            alt="TP Chamba Logo"
            className="w-full h-full object-contain opacity-80"
            width={500}
            height={500}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-primary animate-spin" />
          </div>
        </div>

        {/* Loading text with animation */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className="font-semibold text-primary text-xl">TP Chamba</h3>
          <p className="text-muted-foreground text-sm mt-1">{text}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
