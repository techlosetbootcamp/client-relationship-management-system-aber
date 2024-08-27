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

const Cart = ({ toggleCart, toggleVal, cartProducts, totalQuantity }: any) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const userName = session?.data?.user?.name;
  const userEmail = session?.data?.user?.email;
  console.log("tyui", cartProducts);
  // const [cartItems, setCartItems] = useState<any>([]);
  const [subTotal, setSubTotal] = useState(0);
  // console.log(cartItems);
  const cartData = useSelector((state: RootState) => state.cart.cartData);

  const checkingAddOrder = async () => {
    const response = await axiosInstance.post("/order/order-items", {
      userId,
      customerEmail: userEmail,
      customerName: userName,
      customerPhone: "23456",
      customerAddress: "abc",
      orders: cartData,
      subTotal,
      totalQuantity
    });

    console.log("checking Add Order Response", response);
  };

  useEffect(() => {
    let sum = 0;
    cartData.forEach((item: any) => {
      sum += +item.product.price * +item.quantity;
    });
    setSubTotal(sum);
  }, [cartData]);

  // const increase = (product: ProductProps) => {
  //   console.log("clicked", product);
  //   const updatedCart = cartItems.map((item: ProductProps) => {
  //     if (item.id === product.id) {
  //       console.log("inside if", item.productName);
  //       return {
  //         ...item,
  //         quantity: (+item.quantity + 1).toString(),
  //       };
  //     }
  //     console.log("outside if", item.productName);
  //     return item;
  //   });

  //   setCartItems(updatedCart);
  // };

  // useEffect(() => {
  //   setCartItems(cartProducts);
  //   console.log("useEffect", cartItems);
  // }, [cartProducts]);
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

      <div className="flex flex-col gap-[20px]">
        <div className=" flex flex-col gap-[8px] h-[500px] overflow-auto px-[10px] shadow-md">
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
              // <CardWrapper
              //   width="w-full"
              //   height=""
              //   flexDirection="flex-row shadow-md"
              // >
              //   <div className="rounded-[10px] w-[180px] min-h-[150px] shadow-md flex items-center justify-center relative overflow-hidden">
              //     <Image
              //       src={product?.image}
              //       alt="product Image"
              //       fill
              //       className="object-cover"
              //     />
              //   </div>

              //   <div className="flex flex-col justify-start w-full gap-[10px] px-[10px]">
              //     <div className="">
              //       <p className="text-[20px] font-[600]">
              //         {product?.productName}
              //       </p>
              //       <p className="text-[14px] font-[500] text-blue">
              //         {product?.category}
              //       </p>
              //     </div>

              //     <p className="font-[500]">${+product?.price}</p>

              //     <div className="flex gap-[20px] items-center">
              //       <IoMdRemoveCircle
              //         size={30}
              //         onClick={() => increase(product)}
              //       />
              //       <span className="font-[500] text-[18px]">
              //         {product.quantity}
              //       </span>
              //       <IoMdAddCircle
              //         size={30}
              //         onClick={() => increase(product)}
              //       />
              //     </div>
              //   </div>
              // </CardWrapper>
            );
          })}
        </div>

        <div className="flex justify-between px-[10px]">
          <p className="font-[600] text-[24px]">SubTotal:</p>
          <p className="font-[600] text-[24px]">${subTotal}</p>
        </div>

        <div onClick={checkingAddOrder}>check out</div>
      </div>
    </div>
  );
};

export default Cart;
