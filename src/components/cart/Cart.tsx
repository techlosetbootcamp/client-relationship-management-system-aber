"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CardWrapper } from "../cardWrapper/CardWrapper";
import productImg from "@/assets/images/productImg.svg";
import Image from "next/image";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import CartCard from "../cartCard/CartCard";
import { ProductProps } from "@/types/Types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { axiosInstance } from "@/helpers/axiosInstance";
import InputField from "../inputField/InputField";
import Button from "../button/Button";
import useSessionData from "@/hooks/useSessionData";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cart = ({ toggleCart, toggleVal, totalQuantity }: any) => {
  const router = useRouter();
  const {
    isFormOpen,
    setIsFormOpen,
    subTotal,
    setSubTotal,
    addOrder,
    cartData,
  } = useCart(totalQuantity);
  const { userId, userName, userEmail } = useSessionData();

  // const handleNavigation = () => {
  //   const cartProducts = JSON.stringify(cartData);
  //   const cartProductQuantity = totalQuantity;
  //   const cartProductTotal = subTotal

  //   router.push(`/checkout?cartData=${encodeURIComponent(cartProducts)}&totalQuantity=${totalQuantity}&subTotal=${subTotal}`);
  // };


  return (
    <div className={`bg-white w-[400px] h-screen `}>
      <div className="bg-black flex py-[15px] items-center px-[10px] mb-[15px]">
        <div onClick={toggleCart}>
          <FaArrowLeftLong color="white" size={25} />
        </div>

        <p className=" text-white text-center w-full font-[500]">
          SHOPPING CART
        </p>
      </div>

      <div className="flex flex-col gap-[20px] bg-white">
        <div className=" flex flex-col gap-[8px] h-[480px] overflow-auto px-[10px] shadow-md">
          {cartData.map((item: any) => {
            console.log("cardData item", item);
            // setSubtotal(subtotal+(+product.price))
            return (
              <div key={item.product.id}>
                <CartCard
                  id={item?.product.id}
                  image={item.product.image}
                  category={item.product.category}
                  productName={item?.product.productName}
                  price={item?.product.price}
                  quantity={item?.quantity}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between px-[10px] ">
          <p className="font-[600] text-[24px]">SubTotal:</p>
          <p className="font-[600] text-[24px]">${subTotal}</p>
        </div>

        <div className="flex flex-col gap-[5px] px-[10px] py-[25px]">
          <Link href={{
            pathname : "/checkout",
            query : {cartData :JSON.stringify(cartData), totalQuantity,subTotal}
          }}>
          <Button
            text={"Checkout"}
            background="bg-black"
            color="text-white"
            fontSize="text-[16px]"
            fontWeight="font-[600]"
            rounded="rounded-[8px]"
            gap="gap-[8px]"
            lineHeight="leading-[24px]"
            border=""
            px="px-[12px]"
            py="py-[12px]"
            img={""}
            width="w-full"
            onClick={()=>{}}
            disabled={false}
          />
          </Link>

          <Button
            text={"Continue Shopping"}
            background="bg-black"
            color="text-white"
            fontSize="text-[16px]"
            fontWeight="font-[600]"
            rounded="rounded-[8px]"
            gap="gap-[8px]"
            lineHeight="leading-[24px]"
            border=""
            px="px-[12px]"
            py="py-[12px]"
            img={""}
            width="w-full"
            onClick={toggleCart}
            disabled={false}
          />
        </div>
      </div>
      {/* <div
        className={`w-full relative z-0 border-2 border-secondaryRed bg-secondaryBlue transition  ${
          isFormOpen ? "translate-y-0" : "translate-y-[-450px]"
        } duration-300 gap-[10px] flex flex-col py-[30px] px-[10px]`}
      >
        <InputField
          type="text"
          width="w-full"
          rounded="rounded-[8px]"
          height=""
          placeholder="Mobile Number"
          onChange={() => {}}
        />
        <InputField
          type="text"
          width="w-full"
          rounded="rounded-[8px]"
          height=""
          placeholder="Mobile Number"
          onChange={() => {}}
        />
        <InputField
          type="text"
          width="w-full"
          rounded="rounded-[8px]"
          height=""
          placeholder="Mobile Number"
          onChange={() => {}}
        />
      </div> */}
    </div>
  );
};

export default Cart;
