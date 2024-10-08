"use client";
import { AvatarProps } from "@/types/Types";
import { useSession } from "next-auth/react";
import Image, { StaticImageData } from "next/image";
import React, { ReactElement, ReactNode } from "react";

const Avatar = ({ height, width, radius, img, background }: AvatarProps) => {
  return (
    <div
      className={`${height} ${width} ${radius} ${background} overflow-hidden relative flex justify-center`}
    >
      {typeof img === "string" || (typeof img === "object" && "src" in img) ? (
        <Image src={img} alt="avatar" fill />
      ) : (
        <div className="flex items-center">{img}</div>
      )}
    </div>
  );
};

export default Avatar;
