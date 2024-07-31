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
  border
}: ButtonProps) => {
  return (
    <button
      className={`${background} ${width} ${border} ${rounded} ${gap} ${px} ${py}  flex items-center justify-center`}
    >
      {img && <Image src={img} alt="icon" />}

      <p
        className={`${fontSize} ${color} ${lineHeight} ${fontWeight} font-albertSans`}
      >
        {text}
      </p>
    </button>
  );
};

export default Button;
