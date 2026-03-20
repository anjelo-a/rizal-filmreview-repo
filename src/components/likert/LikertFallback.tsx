"use client";

import type { LikertOption, LikertValue } from "./likertConfig";

type LikertFallbackProps = {
  groupId: string;
  question: string;
  options: readonly LikertOption[];
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
  disabled?: boolean;
  compact?: boolean;
};

export function LikertFallback({
  groupId,
  question,
  options,
  value,
  onChange,
  disabled = false,
  compact = false,
}: LikertFallbackProps) {
  return (
    <fieldset
      className="space-y-3"
      aria-label={`Likert rating for: ${question}`}
      disabled={disabled}
    >
      <legend className="sr-only">{question}</legend>
      <div
        className={`grid gap-3 ${
          compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-5"
        }`}
      >
        {options.map((option) => {
          const inputId = `${groupId}-${option.value}`;
          const isSelected = value === option.value;

          return (
            <div key={option.value} className="relative">
              <input
                id={inputId}
                type="radio"
                name={groupId}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
                disabled={disabled}
              />
              <label
                htmlFor={inputId}
                className="flex cursor-pointer items-start justify-between gap-3 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-4 text-left transition duration-200 hover:border-[#d8bc82]/55 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#f2dbab] peer-checked:border-[#efd4a0]/70 peer-checked:bg-[linear-gradient(180deg,rgba(214,176,110,0.22),rgba(255,255,255,0.05))] peer-checked:shadow-[0_16px_48px_rgba(0,0,0,0.22)]"
              >
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#d8bc82]/78">
                    {option.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#fbf4e7]">
                    {option.label}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className={`mt-1 h-3 w-3 rounded-full border transition ${
                    isSelected
                      ? "border-[#f5dcab] bg-[#f5dcab]"
                      : "border-white/30 bg-transparent"
                  }`}
                />
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export default LikertFallback;
