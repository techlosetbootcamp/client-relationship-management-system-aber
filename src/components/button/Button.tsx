import Image, { StaticImageData } from "next/image";
import React from "react";

type ButtonProps = {
  background: string;
  img: string | StaticImageData | null;
  width: string;
  rounded: string;
  gap: string;
  color: string;
  text: string;
  fontWeight: string;
  fontSize: string;
  px: string;
  py: string;
  lineHeight: string;
};

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
}: ButtonProps) => {
  return (
    <button
      className={`${background} ${width} ${rounded} ${gap} ${px} ${py}  flex items-center justify-center`}
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
