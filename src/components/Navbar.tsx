"use client";
import React, { useEffect, useRef, useState } from "react";

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
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

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

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!menuRef.current) return;
			if (!menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen]);

	const handleClick = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
		setIsOpen(false);
	};

	return (
		<nav className="sticky top-0 z-40 w-full border-b border-transparent bg-[#f1f7ee]/80 bg-opacity-80 backdrop-blur-md shadow-md">
			<div className="container mx-auto px-4">
				<div className="flex h-20 items-center justify-between md:justify-center">
					<span className="text-lg font-semibold text-gray-800 md:hidden">
						Rizal in Dapitan
					</span>
					<button
						type="button"
						className="flex items-center rounded-md border border-[#b0bea9] p-2 text-[#92aa83] md:hidden"
						onClick={() => setIsOpen((prev) => !prev)}
						aria-label="Toggle navigation"
					>
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					<ul className="hidden space-x-8 md:flex">
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
			<div
				ref={menuRef}
				className={`md:hidden overflow-hidden border-t border-[#b0bea9]/40 bg-[#f1f7ee] transition-all duration-300 ease-out ${
					isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="px-4 py-4">
					<ul className="flex flex-col gap-4">
						{items.map((item) => (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									className={`block text-gray-700 transition-colors hover:text-[#92aa83] ${
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

