"use client";
import React, { useEffect, useRef, useState } from "react";

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
	const ref = useRef<HTMLElement | null>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setVisible(true);
				});
			},
			{ threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const bgClass = background === "light" ? "bg-[#e0edc5]" : "bg-white";
	const containerClasses = containerClassName ?? "mx-auto max-w-4xl px-6";
	const contentClasses = contentClassName ?? "prose prose-lg max-w-none text-gray-800";
	const headingClasses = titleClassName ?? "mb-8 text-3xl font-bold tracking-tight text-gray-900";

	return (
		<section
			id={id}
			ref={ref}
			className={`${bgClass} py-20 transition duration-700 ease-out ${
				visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
			} ${className ?? ""}`}
		>
			<div className={containerClasses}>
				<h2 className={headingClasses}>{title}</h2>
				<div className={contentClasses}>{children}</div>
			</div>
		</section>
	);
};

export default Section;
