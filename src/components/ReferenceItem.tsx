import React from "react";
import type { Reference } from "../types/reference";

export const ReferenceItem: React.FC<{ refItem: Reference }> = ({ refItem }) => {
	return (
		<li className="mb-4 text-base leading-relaxed text-gray-800">
			<span className="font-semibold">{refItem.author}</span>
			{refItem.year ? <span> ({refItem.year}). </span> : <span>. </span>}
			<span className="italic">{refItem.title}</span>
			{refItem.source ? <span>. {refItem.source}.</span> : <span>.</span>}
			{refItem.url ? (
				<span>
					{" "}
					<a className="text-[#92aa83] underline" href={refItem.url}>
						{refItem.url}
					</a>
				</span>
			) : null}
		</li>
	);
};

export default ReferenceItem;
