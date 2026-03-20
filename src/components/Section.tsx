"use client";
import type React from "react";

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  background?: "light" | "white";
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
};

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
  background = "white",
  className,
  containerClassName,
  contentClassName,
  titleClassName,
}) => {
  const bgClass = background === "light" ? "bg-[#e0edc5]" : "bg-white";
  const containerClasses = containerClassName ?? "mx-auto max-w-4xl px-6";
  const contentClasses =
    contentClassName ?? "prose prose-lg max-w-none text-gray-800";
  const headingClasses =
    titleClassName ??
    "mb-8 font-serif text-3xl font-semibold tracking-[-0.02em] text-gray-900 md:text-4xl";

  return (
    <section
      id={id}
      className={`${bgClass} py-20 ${className ?? ""}`}
    >
      <div className={containerClasses}>
        <h2 className={headingClasses}>{title}</h2>
        <div className={contentClasses}>{children}</div>
      </div>
    </section>
  );
};

export default Section;
