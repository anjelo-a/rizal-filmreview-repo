"use client";

import { useEffect, useState } from "react";
import LikertFallback from "./LikertFallback";
import LikertScene from "./LikertScene";
import { type LikertValue } from "./likertConfig";
import { useLikertSelection } from "./useLikertSelection";

type PresentationMode = "mobile" | "tablet" | "desktop";

export type Likert3DProps = {
  question: string;
  value?: LikertValue;
  defaultValue?: LikertValue;
  onChange?: (value: LikertValue) => void;
  disabled?: boolean;
};

function getPresentationMode(width: number): PresentationMode {
  if (width < 768) {
    return "mobile";
  }

  if (width < 1024) {
    return "tablet";
  }

  return "desktop";
}

function canRenderWebGL() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Likert3D({
  question,
  value,
  defaultValue,
  onChange,
  disabled = false,
}: Likert3DProps) {
  const { currentValue, selectedOption, groupId, options, selectValue } =
    useLikertSelection({
      value,
      defaultValue,
      onChange,
      disabled,
    });
  const [mode, setMode] = useState<PresentationMode>("mobile");
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      setMode(getPresentationMode(window.innerWidth));
    };

    updateMode();
    setWebglReady(canRenderWebGL());
    window.addEventListener("resize", updateMode);

    return () => window.removeEventListener("resize", updateMode);
  }, []);

  const showScene = webglReady && mode !== "mobile";
  const selectedCopy = selectedOption
    ? `${selectedOption.label}`
    : "No response selected yet";

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#d5b98a]/18 bg-[linear-gradient(180deg,rgba(13,10,8,0.98),rgba(8,6,5,0.98))] p-5 text-white shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-6 lg:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,176,110,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(120,76,33,0.14),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(240,218,177,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(240,218,177,0.14)_1px,transparent_1px)] [background-size:82px_82px]" />
      <div className="relative">
        <div className="max-w-3xl">
          <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#d8bc82]/84">
            Review Prompt
          </p>
          <h3 className="mt-3 font-serif text-[1.75rem] leading-tight text-[#fbf4e7] sm:text-[2rem]">
            {question}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#e7dcc9]/76">
            Select the panel that best matches your reading of the film. The
            3D scene is a visual layer, while the controls below keep the
            selection readable, keyboard-friendly, and dependable on smaller
            screens.
          </p>
        </div>

        {showScene ? (
          <div
            className={`mt-6 overflow-hidden rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(32,22,16,0.82),rgba(8,6,5,0.98))] ${
              mode === "desktop" ? "h-[420px]" : "h-[360px]"
            }`}
            aria-hidden="true"
          >
            {/* The scene stays decorative from an accessibility standpoint.
                State is always mirrored below in semantic HTML controls. */}
            <LikertScene
              value={currentValue}
              onChange={selectValue}
              disabled={disabled}
              viewport={mode === "desktop" ? "desktop" : "tablet"}
            />
          </div>
        ) : (
          <div className="mt-6 rounded-[24px] border border-[#d5b98a]/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#d8bc82]/78">
              Mobile fallback
            </p>
            <p className="mt-3 text-sm leading-6 text-[#e7dcc9]/76">
              Smaller screens use the streamlined card selector below to keep
              the review prompt stable, legible, and quick to answer.
            </p>
          </div>
        )}

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <LikertFallback
            groupId={groupId}
            question={question}
            options={options}
            value={currentValue}
            onChange={selectValue}
            disabled={disabled}
            compact={mode === "mobile"}
          />
          <div className="rounded-[22px] border border-[#d5b98a]/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#d8bc82]/82">
              Current response
            </p>
            <p className="mt-3 font-serif text-[1.3rem] text-[#fbf4e7]">
              {selectedCopy}
            </p>
            <p className="mt-2 text-sm text-[#e7dcc9]/76">
              Value: {currentValue ?? "—"} / 5
            </p>
            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/8"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#a56b31,#f0d7a4)] transition-all duration-300"
                style={{ width: `${((currentValue ?? 0) / 5) * 100}%` }}
              />
            </div>
            <p aria-live="polite" className="mt-4 text-sm text-[#f2e5cb]">
              Selected: {selectedCopy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Likert3D;
