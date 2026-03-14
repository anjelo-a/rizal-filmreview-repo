"use client";

import { useState, useEffect } from 'react';
import { film } from '@/data/film';
import { withBasePath } from '@/lib/withBasePath';

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bannerUrl = withBasePath(film.banner);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-top z-0"
        style={{
          backgroundImage: `url(${bannerUrl})`,
          backgroundPosition: "center top",
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div className="relative z-20 text-center text-white p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{film.title}</h1>
        <p className="text-lg md:text-2xl">{film.tagline}</p>
      </div>
    </section>
  );
};

export default Hero;
