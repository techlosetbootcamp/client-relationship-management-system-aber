"use client";
import { useSession } from "next-auth/react";
import Image, { StaticImageData } from "next/image";
import React, { ReactElement, ReactNode } from "react";

type AvatarProps = {
  height: string;
  width: string;
  radius: string;
  background: string;
  img: string | StaticImageData | ReactElement;
};

const Avatar = ({ height, width, radius, img, background }: AvatarProps) => {
  const session = useSession();

  return (
    <div
      className={`${height} ${width} ${radius} ${background} overflow-hidden relative flex justify-center`}
    >
      {typeof img === "string" || (typeof img === "object" && "src" in img) ? (
        <Image src={img} alt="avatar" fill />
      ) : (
        // <Image src={img} alt='avatar' className='' fill/>
        <div className="flex items-center">{img}</div>
      )}
    </div>
  );
};

export default Avatar;
