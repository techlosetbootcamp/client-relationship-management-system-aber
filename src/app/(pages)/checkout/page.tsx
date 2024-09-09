"use client";
import Button from "@/components/button/Button";
import CartCard from "@/components/cartCard/CartCard";
import { Header } from "@/components/header/Header";
import InputField from "@/components/inputField/InputField";
import useCart from "@/hooks/useCart";
import useProducts from "@/hooks/useProducts";
import useSessionData from "@/hooks/useSessionData";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { US_STATES } from "@/constants/UsStates";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Suspense } from "react";
import { CgSpinner } from "react-icons/cg";

const Page = () => {
  const searchParams = useSearchParams();
  const [cartData, setCartData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);


  const { userName, userEmail } = useSessionData();

  const {
    addOrder,
    isLoading,
    address,
    AddressHandler,
    subTotal,
    setSubTotal,
    userPhone,
    setUserPhone,
    amount,
    setAmount,
    isClicked,
    setIsClicked,
  } = useCart(totalQuantity ?? 0);

  useEffect(() => {
    const cartDataParam = searchParams.get("cartData");
    const totalQuantityParam = searchParams.get("totalQuantity");
    const subTotalParam = searchParams.get("subTotal");
    
      // console.log("inside use effect"),
      // searchParams,
      // cartDataParam && JSON.parse(decodeURIComponent(cartDataParam)),
      // totalQuantityParam,
      // subTotalParam
   

    if (cartDataParam) {
      try {
        setCartData(JSON.parse(decodeURIComponent(cartDataParam)));
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }

    if (totalQuantityParam) {
      setTotalQuantity(parseInt(totalQuantityParam, 10));
    }
    if (subTotalParam) {
      setSubTotal(parseInt(subTotalParam, 10));
    }

    console.log(totalQuantity, cartData);
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-[22px] md:ml-[12px] w-full h-full overflow-x-auto ">
      <Header text="Checkout" avatar={false} />
      <div className="grid md:grid-cols-2  overflow-auto items-center">
        <div className="flex flex-col gap-[10px] md:px-[50px]">
          <div className="relative rounded-[8px] h-[4rem] border border-borderGray">
            <ul
              className={`absolute h-[290px] overflow-auto w-full ${
                isClicked ? "block" : "hidden"
              } top-[4.5rem] bg-white shadow-sm  rounded-[4px] flex flex-col `}
            >
              {US_STATES.map((item) => {
                return (
                  <li
                    key={item.state}
                    className={`cursor-pointer hover:bg-primaryPurple hover:text-white px-[20px] h-[2.5rem] flex items-center  border ${
                      address === item.state
                        ? "bg-primaryPurple text-white"
                        : "text-black"
                    } `}
                    onClick={() => {
                      AddressHandler(item.state);
                    }}
                  >
                    {item.state}
                  </li>
                );
              })}
            </ul>

            <div className="absolute rounded-[8px]  w-full text-black bg-white z-10 h-full flex justify-between items-center px-[8px]">
              <p>{address}</p>
              {isClicked ? (
                <IoIosArrowUp onClick={() => setIsClicked(!isClicked)} />
              ) : (
                <IoIosArrowDown onClick={() => setIsClicked(!isClicked)} />
              )}
            </div>
          </div>
          <InputField
            type="text"
            width="w-full"
            rounded="rounded-[8px]"
            height="h-[4rem]"
            placeholder="Name"
            value={userName ?? ""}
            disabled={true}
            onChange={() => {}}
          />
          <InputField
            type="text"
            width="w-full"
            rounded="rounded-[8px]"
            height="h-[4rem]"
            placeholder="Email"
            value={userEmail ?? ""}
            disabled={true}
            onChange={() => {}}
          />
          <InputField
            type="text"
            width="w-full"
            rounded="rounded-[8px]"
            height="h-[4rem]"
            placeholder="Enter Phone No. e.g, 03123456789"
            value={userPhone}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
          />
          <InputField
            type="text"
            width="w-full"
            rounded="rounded-[8px]"
            height="h-[4rem]"
            value={amount}
            placeholder="Enter Amount e.g, 100"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <Button
            text={isLoading ? "Checking Out..." : "Checkout"}
            background="bg-primaryPurple"
            color="text-white"
            fontSize="text-[16px]"
            fontWeight="font-[600]"
            rounded="rounded-[8px]"
            gap="gap-[8px]"
            lineHeight="leading-[24px]"
            border=""
            px="px-[12px]"
            py="py-[14px]"
            img={""}
            width="w-full"
            onClick={() => addOrder(userPhone, address, amount)}
            Icon={isLoading ? CgSpinner : null}
            disabled={isLoading ? true : false}
          />
        </div>

        <div className=" h-full flex flex-col xs:py-[20px] md:py-0 gap-[20px] md:px-[50px] h-full overflow-auto justify-center">
          {cartData.map((item: any) => {
            console.log("cardData item", item);
            // setSubtotal(subtotal+(+product.price))
            return (
              <div key={item.product.id} className="">
                <CartCard
                  id={item?.product.id}
                  image={item.product.image}
                  category={item.product.category}
                  productName={item?.product.productName}
                  price={item?.product.price}
                  quantity={item?.quantity}
                  type="checkout"
                />
              </div>
            );
          })}
          <div className="border border-borderGray" />
          <div className="flex justify-between font-[600] text-[18px] font-albertSans">
            <p className="">Subtotal</p>
            <p>${subTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

// import CartCard from "@/components/cartCard/CartCard";
// import { Header } from "@/components/header/Header";
// import useCart from "@/hooks/useCart";
// import useProducts from "@/hooks/useProducts";

{
  /* <Header text="Order List" avatar={false} />
<div className="border-2 border-secondaryRed h-full">
{/* {cartData.map((item: any) => {
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
})} */
}

// </div> */}
