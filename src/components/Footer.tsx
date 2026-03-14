import React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="mt-24 border-t border-gray-200 bg-white py-10">
			<div className="mx-auto max-w-4xl px-6 text-sm text-gray-700">
				<div className="font-semibold text-gray-900">University of Makati</div>
				<div>Rizal – Life, Works, and Writings</div>
				<div>Midterm Film Review Project</div>
				<div className="mt-2">Student(s): [Student Names]</div>
				<div>Instructor: [Instructor Name]</div>
				<div>Submission Date: [Date]</div>
			</div>
		</footer>
	);
};

export default Footer;
