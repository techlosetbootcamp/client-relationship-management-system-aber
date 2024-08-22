import React from "react";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import Button from "../button/Button";
import Image from "next/image";
import productImg from "@/assets/images/productImg.svg";

const ProductCard = () => {
  return (
    <CardWrapper height="" width="xs:300px" flexDirection="flex-col">
      <div className="rounded-[10px] sm:min-w-[260px] min-h-[120px] shadow-md flex items-center justify-center">
        <Image src={productImg} alt="product Image" />
      </div>
      <div className="flex flex-col justify-start w-full gap-[10px]">
        <div>
          <p className="text-[20px] font-[600]">Kitchen Mug</p>
          <p className="text-[14px] font-[500] text-blue">HomeGoods</p>
        </div>

        <p className="font-[500]">$10</p>
      </div>
      <div className="flex w-full mx-auto gap-[10px]">
        <Button
          text={"Buy now"}
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
          width=""
        />
        <Button
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
      </div>
    </CardWrapper>
  );
};

export default ProductCard;
