import { Header } from "@/components/header/Header";
import ProductCard from "@/components/productCard/ProductCard";
import React from "react";
import { FaCartPlus } from "react-icons/fa";

const Page = () => {
  return (
    <div className="flex flex-col gap-[22px] mx-[12px] w-full">
      <div className="flex w-full items-center gap-[8px]">
        <div className="w-full">
          <Header text="Products List" avatar={false}/>
        </div>
        <FaCartPlus size={30}/>
      </div>
      <div className="grid grid-cols-4">
        <ProductCard />
      </div>
    </div>
  );
};

export default Page;
