"use client";
import React, { useEffect, useState } from "react";

type NavItem = { id: string; label: string };

const items: NavItem[] = [
	{ id: "introduction", label: "Introduction" },
	{ id: "summary", label: "Film Summary" },
	{ id: "analysis", label: "Analysis" },
	{ id: "highlights", label: "Highlights" },
	{ id: "reflection", label: "Reflection" },
	{ id: "conclusion", label: "Conclusion" },
	{ id: "references", label: "References" },
];

export function Navbar() {
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ rootMargin: "-30% 0px -70% 0px" },
		);

		items.forEach((item) => {
			const el = document.getElementById(item.id);
			if (el) observer.observe(el);
		});

		return () => {
			items.forEach((item) => {
				const el = document.getElementById(item.id);
				if (el) observer.unobserve(el);
			});
		};
	}, []);

	const handleClick = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<nav className="sticky top-0 z-40 w-full border-b border-transparent bg-[#f1f7ee]/80 bg-opacity-80 backdrop-blur-md shadow-md">
			<div className="container mx-auto px-4">
				<div className="flex h-20 items-center justify-center">
					<ul className="flex space-x-8">
						{items.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									className={`text-gray-600 transition-colors hover:text-[#92aa83] ${
										activeSection === item.id ? "text-[#92aa83] font-semibold" : ""
									}`}
									onClick={(e) => {
										e.preventDefault();
										handleClick(item.id);
									}}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;

