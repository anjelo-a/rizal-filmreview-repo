"use client";

type RatingLabelProps = {
  value: number;
  label: string;
  active: boolean;
};

export function RatingLabel({ value, label, active }: RatingLabelProps) {
  return (
    <div
      className={`rounded-full border px-3 py-2 text-center transition-colors duration-500 ${
        active
          ? "border-[#f1c978]/55 bg-[#f0c879]/10 text-[#fff1cb]"
          : "border-white/10 bg-white/[0.03] text-[#cbbca4]"
      }`}
    >
      <span className="block text-[0.62rem] uppercase tracking-[0.3em] opacity-70">
        {value}
      </span>
      <span className="mt-1 block text-[0.68rem] uppercase tracking-[0.18em] sm:text-[0.72rem]">
        {label}
      </span>
    </div>
  );
}
