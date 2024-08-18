"use client";
import React from "react";

type InputProps = {
  height: string;
  width: string;
  rounded: string;
  placeholder: string;
  value?: string ;
  type: string;
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
  onChange,
 
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      className={`${height} ${width} ${rounded} bg-white border border-lightestGray px-[12px] py-[6px] placeholder:font-albertSans`}
      onChange={onChange}
    />
  );
};

export default InputField;
