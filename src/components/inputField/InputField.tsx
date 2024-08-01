"use client";
import React from "react";

type InputProps = {
  height: string;
  width: string;
  rounded: string;
  placeholder: string;
  value:string ;

  onChange: (e: any) => void;
};

// import outline too
const InputField = ({
  height,
  width,
  rounded,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        value={value}
        className={`${height} ${width} ${rounded} bg-white border border-lightestGray px-[12px] py-[6px] placeholder:font-albertSans`}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
