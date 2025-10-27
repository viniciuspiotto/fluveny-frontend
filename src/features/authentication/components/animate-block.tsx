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
    <div className="relative flex justify-center gap-2 lg:mt-2">
      <img
        src="/img/effect.svg"
        alt="efeito de pincelada"
        className="absolute -top-2 left-1/2 z-10 hidden w-90 -translate-x-1/2 lg:flex"
      />
      <div
        className={cn(
          'relative h-10 overflow-hidden rounded-sm text-left text-xl transition-[width] duration-700 ease-in-out lg:text-4xl',
          {
            'w-44': currentIndex === 0,
            'w-62': currentIndex === 1,
            'w-52': currentIndex === 2,
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
            className="absolute inset-0 z-20 flex items-center justify-center"
          >
            <p className="font-lexend-zetta from-primary to-destructive bg-gradient-to-r bg-clip-text text-left text-4xl font-bold tracking-widest text-transparent">
              {words[currentIndex]}.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
