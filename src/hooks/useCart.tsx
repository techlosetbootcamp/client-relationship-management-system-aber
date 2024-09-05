"use client"
import React, { useEffect, useState } from "react";
import useSessionData from "./useSessionData";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { axiosInstance } from "@/helpers/axiosInstance";

const useCart = (totalQuantity: number) => {
  const { userId, userName, userEmail } = useSessionData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [totalPurchasedPrice, setTotalPurchasedPrice] = useState(0);

  const cartData = useSelector((state: RootState) => state.cart.cartData);
  

  const addOrder = async (userPhone : string, address : string, amount : string) => {
    console.log("checking parse int", amount,)
    console.log("inside add order", cartData)
    const response = await axiosInstance.post("/order/add-order", {
      userId,
      customerEmail: userEmail,
      customerName: userName,
      customerPhone: userPhone,
      customerAddress: address,
      paidAmount : amount,
      orders: cartData,
      subTotal,
      totalPurchasedPrice,
      totalQuantity,
    });

    setIsFormOpen(!isFormOpen);

    console.log("checking Add Order Response", response);
  };

  useEffect(() => {
    let sum = 0, purchasePriceSum=0;
    cartData.forEach((item: any) => {
      sum += +item.product.price * +item.quantity;
      purchasePriceSum  += item.product.purchasedPrice * +item.quantity
    });
    setSubTotal(sum);
    setTotalPurchasedPrice(purchasePriceSum)
  }, [cartData]);

  return {
    isFormOpen,
    setIsFormOpen,
    subTotal,
    setSubTotal,
    addOrder,
    cartData,
  };
};

export default useCart;
