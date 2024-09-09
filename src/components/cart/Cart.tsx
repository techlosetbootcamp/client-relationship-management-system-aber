"use client";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import CartCard from "../cartCard/CartCard";
import Button from "../button/Button";
import useCart from "@/hooks/useCart";
import Link from "next/link";

const Cart = ({ toggleCart, toggleVal, totalQuantity }: any) => {
  const {
    subTotal,
    cartData,
  } = useCart(totalQuantity);

  return (
    <div
      className={`bg-white xs:w-[290px] sm:w-[350px] md:w-[400px] h-screen `}
    >
      <div className="bg-black flex py-[15px] items-center px-[10px] mb-[15px]">
        <div onClick={toggleCart}>
          <FaArrowLeftLong color="white" size={25} />
        </div>

        <p className=" text-white text-center w-full font-[500]">
          SHOPPING CART
        </p>
      </div>

      <div className="flex flex-col gap-[20px] bg-white">
        {cartData.length > 0 ? (
          <>
            <div className=" flex flex-col gap-[8px] h-[480px] overflow-auto px-[10px] shadow-md">
              {cartData.map((item: any) => {
                console.log("cardData item", item);

                return (
                  <div key={item.product.id}>
                    <CartCard
                      id={item?.product.id}
                      image={item.product.image}
                      category={item.product.category}
                      productName={item?.product.productName}
                      price={item?.product.price}
                      quantity={item?.quantity} 
                      type={""}                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between px-[10px] ">
              <p className="font-[600] text-[24px]">SubTotal:</p>
              <p className="font-[600] text-[24px]">${subTotal}</p>
            </div>

            <div className="flex flex-col gap-[5px] px-[10px] py-[25px]">
              <Link
                href={{
                  pathname: "/checkout",
                  query: {
                    cartData: JSON.stringify(cartData),
                    totalQuantity,
                    subTotal,
                  },
                }}
              >
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
                  onClick={() => {}}
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
          </>
        ) : (
          <p className="mt-[20%] text-center">
            No Products has been added to the cart!!!
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
