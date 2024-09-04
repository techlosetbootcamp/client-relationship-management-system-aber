import { ButtonProps } from "@/types/Types";
import Image, { StaticImageData } from "next/image";
import React from "react";

const Button = ({
  background,
  img,
  width,
  rounded,
  gap,
  color,
  text,
  fontWeight,
  fontSize,
  px,
  py,
  lineHeight,
  border,
  onClick,
  Icon,
  disabled
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${background}  ${border} ${rounded} ${gap} ${px} ${py} ${width} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} flex items-center justify-center`}
    >
      {img && <Image src={img} alt="icon" />}
      {Icon && <Icon color="white" size={25} className={disabled ? "animate-spin" : ""}/>}

      <p
        className={`${fontSize} ${color} ${lineHeight} ${fontWeight} font-albertSans`}
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
