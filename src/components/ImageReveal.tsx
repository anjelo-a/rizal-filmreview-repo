"use client";

import { useRef, useEffect, useState } from 'react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageReveal = ({ src, alt, className }: ImageRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={{
        transition: 'opacity 500ms, transform 500ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(1.05)',
      }}
    />
  );
};

export default ImageReveal;
