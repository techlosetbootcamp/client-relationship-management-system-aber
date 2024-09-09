"use client";
import Cart from "@/components/cart/Cart";
import { Header } from "@/components/header/Header";
import ProductCard from "@/components/productCard/ProductCard";
import { axiosInstance } from "@/helpers/axiosInstance";
import useProducts from "@/hooks/useProducts";
import { handleAddToCart } from "@/redux/slices/cart.slice";
import { RootState } from "@/redux/store";
import { ProductProps } from "@/types/Types";
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const {
    toggle,
    productList,
    totalQuantity,
    toggleCart,
    addToCart,
  } = useProducts("");

  return (
    <div className="flex flex-col gap-[22px] mx-[12px] w-full border-2">
      <div className="flex w-full items-center gap-[8px]">
        <div className="w-full">
          <Header text="Products List" avatar={false} />
        </div>
        <div
          className="relative bg-lightestGray  rounded-full p-[8px]"
          onClick={toggleCart}
        >
          <BsCart3 size={30} />
          <div className="absolute left-0  bg-primaryPurple rounded-full w-[16px] h-[16px] flex justify-center items-center text-[12px] text-white">
            {totalQuantity}
          </div>
        </div>
      </div>
      <div className="grid xmd:grid-cols-2 md:grid-cols-3  gap-[8px]">
        {productList?.map((product: ProductProps) => {
          return (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                productName={product?.productName}
                category={product.category}
                price={product.price}
                image={product.image}
                stock = {product.totalStock}
                onClick={() => addToCart(product)}
              />
            </div>
          );
        })}
      </div>

      <div
        className={`${
          toggle ? "translate-x-0 backdrop-brightness-50" : "translate-x-full"
        }  transition duration-300 ease-in-out  fixed right-0 overflow-x-hidden  border-2 border-red z-10`}
      >
        <Cart
          toggleCart={toggleCart}
          toggleVal={toggle}
          totalQuantity={totalQuantity}
        />
      </div>
      <div
        className={`${
          toggle ? "fixed inset-0 backdrop-brightness-50" : "hidden"
        } transition duration-300 ease-in-out`}
      ></div>
    </div>
  );
};

export default Page;
