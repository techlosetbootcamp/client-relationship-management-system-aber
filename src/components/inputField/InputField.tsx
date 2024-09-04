"use client";
import React from "react";

type InputProps = {
  height: string;
  width: string;
  rounded: string;
  placeholder: string;
  value?: string | number;
  type: string;
  disabled?: boolean;
  onChange: (e: any) => void;
};

// import outline too
const InputField = ({
  height,
  width,
  rounded,
  placeholder,
  type,
  value,
  disabled,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={`${height} ${width} ${rounded} ${
        disabled && " text-mediumGray cursor-not-allowed"
      }  border border-lightestGray px-[12px] py-[6px] placeholder:font-albertSans bg-white`}
      onChange={onChange}
      disabled={disabled && disabled}
      required
    />
  );
};

export default InputField;
