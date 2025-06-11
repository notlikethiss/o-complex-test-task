"use client";

import type { FC } from "react";
import InputMask from "react-input-mask";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PhoneInput: FC<PhoneInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <InputMask
      mask="+7 (999) 999 99-99"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {(inputProps) => (
        <input
          {...inputProps}
          type="tel"
          className="w-full px-4 py-3 rounded-2xl bg-[#222222] text-4xl text-white placeholder-white focus:outline-none"
          placeholder={placeholder || "+7 (___) ___ __-__"}
        />
      )}
    </InputMask>
  );
};

export default PhoneInput;
