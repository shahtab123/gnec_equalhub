'use client';
import React, { useState } from 'react';
import { Github, Star } from 'lucide-react';
import { Colors, Liquid } from '@/components/core/liquid-gradient';

const COLORS: Colors = {
  color1: '#FFFFFF',
  color2: '#1E10C5',
  color3: '#9089E2',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B2B8E7',
  color7: '#0E2DCB',
  color8: '#0017E9',
  color9: '#4743EF',
  color10: '#7D7BF4',
  color11: '#0B06FC',
  color12: '#C5C1EA',
  color13: '#1403DE',
  color14: '#B6BAF6',
  color15: '#C1BEEB',
  color16: '#290ECB',
  color17: '#3F4CC0',
};

export const GitHubButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='flex justify-center'>
      <a
        href='https://github.com/shahtab123/gnec_equalhub'
        target='_blank'
        rel="noopener noreferrer"
        className='relative inline-block sm:w-28 w-10 h-[2.2em] mx-auto group dark:bg-black bg-white rounded-lg'
      >
        <div className='absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[10px] opacity-50'>
          <span className='absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[3px]'></span>
          <div className='relative w-full h-full overflow-hidden rounded-lg'>
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[4px]'></div>
        <div className='relative w-full h-full overflow-hidden rounded-lg'>
          <span className='absolute inset-0 rounded-lg bg-[#d9d9d9]'></span>
          <span className='absolute inset-0 rounded-lg bg-black'></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`absolute inset-0 rounded-lg border-solid border-[3px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${
                i <= 2 ? 'blur-[2px]' : i === 3 ? 'blur-[3px]' : 'blur-[2px]'
              }`}
            ></span>
          ))}
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[8px] bg-[#006]'></span>
        </div>
        <button
          className='absolute inset-0 rounded-lg bg-transparent cursor-pointer'
          aria-label='Get Started'
          type='button'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className='flex items-center justify-center px-2 gap-1 rounded-lg group-hover:text-yellow-400 text-white text-sm font-medium tracking-wide whitespace-nowrap'>
            <Star className='group-hover:fill-yellow-400 fill-white w-4 h-4 flex-shrink-0 sm:flex hidden' />
            <Github className='sm:hidden flex group-hover:fill-yellow-400 fill-white w-4 h-4 flex-shrink-0' />
            <span className='sm:flex hidden'>Github</span>
          </span>
        </button>
      </a>
    </div>
  );
}; 