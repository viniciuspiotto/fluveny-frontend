import { cn } from '@/app/utils/cn';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const words = ['Simples', 'Gamificada', 'Divertida'];

export const AnimateBlock = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center gap-2">
      <div
        className={cn(
          'relative h-10 overflow-hidden rounded-sm text-left text-xl transition-[width] duration-700 ease-in-out',
          {
            'w-36': currentIndex === 0,
            'w-51': currentIndex === 1,
            'w-44': currentIndex === 2,
          },
        )}
      >
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <p className="font-lexend-zetta text-left text-3xl font-bold tracking-widest">
              {words[currentIndex]}.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
