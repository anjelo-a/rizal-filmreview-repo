"use client";

import React from "react";
import type { Highlight } from "../types/highlight";
import ScrollReveal from "./ScrollReveal";

interface HighlightCardProps {
	item: Highlight;
	delay: number;
	direction: "left" | "right" | "up";
}

export const HighlightCard: React.FC<HighlightCardProps> = ({
	item,
	delay,
	direction,
}) => {
	return (
		<ScrollReveal delay={delay} direction={direction}>
			<div className="h-full rounded-2xl border border-[#b0bea9] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg">
				<h3 className="mb-2 text-xl font-semibold text-[#92aa83]">
					{item.title}
				</h3>
				<p className="text-gray-600">{item.description}</p>
			</div>
		</ScrollReveal>
	);
};

export default HighlightCard;
