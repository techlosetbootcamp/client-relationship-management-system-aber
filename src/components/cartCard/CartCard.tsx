"use client";
import React, { useState } from "react";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import Image from "next/image";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { CartCardProps, ProductProps } from "@/types/Types";
import {
  handleCartQuantity,
  handleRemoveFromCart,
} from "@/redux/slices/cart.slice";
import { useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";

const CartCard = ({
  image,
  category,
  productName,
  price,
  quantity,
  id,
  type,
}: CartCardProps) => {
  const dispatch = useDispatch();
  if (type !== "checkout") {
    return (
      <CardWrapper width="w-full" height="" flexDirection="flex-row shadow-md">
        <div className="rounded-[10px] w-[180px] min-h-[150px] shadow-md flex items-center justify-center relative overflow-hidden font-albertSans">
          <Image
            src={image}
            alt="product Image"
            fill
            className="object-cover"
          />
        </div>

        <div className=" w-full flex flex-col justify-start gap-[10px] px-[10px]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[20px] font-[600]">{productName}</p>
              <p className="text-[14px] font-[500] text-blue">{category}</p>
            </div>
            <div>
              <MdDelete
                size={30}
                onClick={() => dispatch(handleRemoveFromCart({ id }))}
              />
            </div>
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
  } else {
    return (
      <div className="flex justify-between items-center font-albertSans">
        <div className="flex gap-[10px] items-center">
          <div className=" rounded-[10px] w-[80px] h-[80px] bg-lightestGray  border border-borderGray flex items-center justify-center ">
            <div className="relative rounded-[10px] w-full h-full mx-[10px]">
              <Image
                src={image}
                alt="product Image"
                fill
                className="object-cover bg-white"
              />

              <div className="absolute right-[-17px] top-[-5px]  bg-mediumGray rounded-full w-[22px] h-[22px] flex justify-center items-center text-[12px] text-white ">
                {quantity}
              </div>
            </div>
          </div>
          <div className="uppercase font-[500]">{productName}</div>
        </div>
        <div className="font-[500]">${+price * +quantity}</div>
      </div>
    );
  }
};

export default CartCard;
