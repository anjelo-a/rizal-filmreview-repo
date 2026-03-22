"use client";

type RatingLabelProps = {
  value: number;
  label: string;
  active: boolean;
};

export function RatingLabel({ value, label, active }: RatingLabelProps) {
  return (
    <div
      className={`h-full min-w-0 rounded-[1rem] border px-2.5 py-2 text-center transition-colors duration-500 sm:rounded-full sm:px-3 ${
        active
          ? "border-[#f1c978]/55 bg-[#f0c879]/10 text-[#fff1cb]"
          : "border-white/10 bg-white/[0.03] text-[#cbbca4]"
      }`}
    >
      <span className="block text-[0.58rem] uppercase tracking-[0.18em] opacity-70 sm:text-[0.62rem] sm:tracking-[0.3em]">
        {value}
      </span>
      <span className="mt-1 block text-[0.62rem] uppercase leading-tight tracking-[0.12em] break-words sm:text-[0.72rem] sm:tracking-[0.18em]">
        {label}
      </span>
    </div>
  );
}
