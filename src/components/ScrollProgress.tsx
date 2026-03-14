"use client";

import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scroll, setScroll] = useState('0%');

  const onScroll = () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;

    setScroll(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-50 h-1 bg-[#92aa83]"
      style={{ width: scroll }}
    />
  );
};

export default ScrollProgress;
