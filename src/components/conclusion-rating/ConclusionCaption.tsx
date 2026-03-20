"use client";

type ConclusionCaptionProps = {
  text: string;
};

export function ConclusionCaption({ text }: ConclusionCaptionProps) {
  return (
    <p className="max-w-xl text-sm leading-7 text-[#f2ead8]/72 sm:text-base">
      {text}
    </p>
  );
}
