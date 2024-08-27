"use client";
import React, { useState } from "react";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import Image from "next/image";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { ProductProps } from "@/types/Types";
import { handleCartQuantity } from "@/redux/slices/cart.slice";
import { useDispatch } from "react-redux";

const CartCard = ({
  image,
  category,
  productName,
  price,
  quantity,
  id,
}: any) => {
  // const [productQuantity, setProductQuantity] = useState(+quantity);
  const dispatch = useDispatch();
  return (
    <CardWrapper width="w-full" height="" flexDirection="flex-row shadow-md">
      <div className="rounded-[10px] w-[180px] min-h-[150px] shadow-md flex items-center justify-center relative overflow-hidden">
        <Image src={image} alt="product Image" fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-start w-full gap-[10px] px-[10px]">
        <div className="">
          <p className="text-[20px] font-[600]">{productName}</p>
          <p className="text-[14px] font-[500] text-blue">{category}</p>
        </div>

        <p className="font-[500]">${+price * +quantity}</p>

        <div className="flex gap-[20px] items-center">
          <IoMdRemoveCircle
            size={30}
            onClick={() =>
              dispatch(handleCartQuantity({ id, quantity: +quantity - 1 }))
            }
          />
          <span className="font-[500] text-[18px]">{quantity}</span>
          <IoMdAddCircle
            size={30}
            onClick={() =>
              dispatch(handleCartQuantity({ id, quantity: +quantity + 1 }))
            }
          />
        </div>
      </div>
    </CardWrapper>
  );
};

export default CartCard;
