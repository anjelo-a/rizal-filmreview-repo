"use client";

import { useId, useMemo, useState } from "react";
import {
  LIKERT_OPTIONS,
  type LikertOption,
  type LikertValue,
} from "./likertConfig";

type UseLikertSelectionOptions = {
  value?: LikertValue;
  defaultValue?: LikertValue;
  onChange?: (value: LikertValue) => void;
  disabled?: boolean;
};

type UseLikertSelectionResult = {
  currentValue?: LikertValue;
  selectedOption?: LikertOption;
  groupId: string;
  options: readonly LikertOption[];
  selectValue: (value: LikertValue) => void;
};

export function useLikertSelection({
  value,
  defaultValue,
  onChange,
  disabled = false,
}: UseLikertSelectionOptions): UseLikertSelectionResult {
  const [internalValue, setInternalValue] = useState<LikertValue | undefined>(
    defaultValue,
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const groupId = useId();

  const selectedOption = useMemo(
    () => LIKERT_OPTIONS.find((option) => option.value === currentValue),
    [currentValue],
  );

  const selectValue = (nextValue: LikertValue) => {
    if (disabled) {
      return;
    }

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return {
    currentValue,
    selectedOption,
    groupId,
    options: LIKERT_OPTIONS,
    selectValue,
  };
}

export type { LikertOption, LikertValue };
