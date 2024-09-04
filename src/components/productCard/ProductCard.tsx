import React from "react";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import Button from "../button/Button";
import Image from "next/image";
import productImg from "@/assets/images/productImg.svg";

type ProductCardProps = {
  id: string;
  productName: string;
  category: string;
  price: number;
  image: string;
  onClick: () => void;
};

const ProductCard = ({
  productName,
  category,
  price,
  image,
  onClick,
  id,
}: ProductCardProps) => {
  //   <div className="w-fit">
  //   <Avatar
  //     height="xs:h-[50px] md:h-[64px]"
  //     width="xs:w-[50px] md:w-[64px]"
  //     radius="rounded-full"
  //     background=""
  //     img={session.data?.user?.image ?? userAvatar}
  //   />
  // </div>
  return (
    <CardWrapper height="" width="w-full" flexDirection="flex-col">
      <div className="rounded-[10px] w-full min-h-[150px] shadow-md flex items-center justify-center relative overflow-hidden">
        <Image src={image} alt="product Image" fill className="object-cover" />
      </div>
      <div className="flex flex-row justify-between items-center w-full gap-[10px]">
        <div>
          <p className="text-[20px] font-[600]">{productName}</p>
          <p className="text-[14px] font-[500] text-blue">{category}</p>
        </div>

        <p className="font-[500]">${price}</p>
      </div>
      {/* <div className="flex w-full mx-auto gap-[10px]"> */}

      <Button
        text={"Add to Cart"}
        background="bg-primaryPurple"
        color="text-white"
        fontSize="text-[16px]"
        fontWeight="font-[600]"
        rounded="rounded-[4px]"
        gap="gap-[8px]"
        lineHeight="leading-[24px]"
        border="border-primaryPurple border"
        px="px-[12px]"
        py="py-[6px]"
        img={""}
        width="w-full"
        onClick={onClick}
        disabled={false}
      />

      {/* <Button
          text={"Add to Cart"}
          background="bg-white"
          color="text-primaryPurple"
          fontSize="text-[16px]"
          fontWeight="font-[600]"
          rounded="rounded-[4px]"
          gap="gap-[8px]"
          lineHeight="leading-[24px]"
          border=""
          px="px-[12px]"
          py="py-[6px]"
          img={""}
          width=""
        />
      </div> */}
    </CardWrapper>
  );
};

export default ProductCard;
