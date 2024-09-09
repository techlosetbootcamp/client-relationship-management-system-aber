"use client";
import React, { useEffect, useState } from "react";
import useSessionData from "./useSessionData";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { axiosInstance } from "@/helpers/axiosInstance";
import { toast } from "@/helpers/toastify";
import { checkoutValidation } from "@/validations/checkoutValidation";
import { FormatErrors } from "@/helpers/formatErrors";
import { useDispatch } from "react-redux";
import { AddOrder } from "@/redux/slices/order.slice";
import { useRouter, useSearchParams } from "next/navigation";
import { handleEmptyCart } from "@/redux/slices/cart.slice";

const useCart = (totalQuantity: number) => {
  const router = useRouter();
  const { userId, userName, userEmail } = useSessionData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [totalPurchasedPrice, setTotalPurchasedPrice] = useState(0);
  const [errorsMessages, setErrorMessages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  // const [cartData, setCartData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [address, setAddress] = useState<string>("Select Address");
  const [userPhone, setUserPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [isClicked, setIsClicked] = useState(false);

  const AddressHandler = (state: string) => {
    setAddress(state);
    setIsClicked(false);
  };

  // useEffect(() => {
  //   const cartDataParam = searchParams.get("cartData");
  //   const totalQuantityParam = searchParams.get("totalQuantity");
  //   const subTotalParam = searchParams.get("subTotal");
  //   console.log(
  //     console.log("inside use effect"),
  //     searchParams,
  //     cartDataParam && JSON.parse(decodeURIComponent(cartDataParam)),
  //     totalQuantityParam,
  //     subTotalParam
  //   );

  //   if (cartDataParam) {
  //     try {
  //       setCartData(JSON.parse(decodeURIComponent(cartDataParam)));
  //     } catch (error) {
  //       console.error("Failed to parse cart data:", error);
  //     }
  //   }

  //   if (totalQuantityParam) {
  //     setTotalQuantity(parseInt(totalQuantityParam, 10));
  //   }
  //   if (subTotalParam) {
  //     setSubTotal(parseInt(subTotalParam, 10));
  //   }

  //   console.log(totalQuantity, cartData);
  // }, [searchParams]);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (errorsMessages) {
      // Clear existing toasts

      // Show the new error toast
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const cartData = useSelector((state: RootState) => state.cart.cartData);

  const addOrder = async (
    userPhone: string,
    address: string,
    amount: string
  ) => {
    // console.log("checking parse int", amount);
    // console.log("inside add order", cartData);
    const validation = checkoutValidation.safeParse({
      userPhone,
      address,
      amount: parseInt(amount, 10),
    });

    if (!validation.success) {
      // console.log("validation errors", validation.error.flatten().fieldErrors);
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));
      // console.log(errorsMessages);
      return;
    } else if (parseInt(amount, 10) != subTotal) {
      toast.error("Amount must not be greater or less than the subtotal");
      return;
    }

    try {
      setIsLoading(true);
      // console.log("loading inside edit document", isLoading);
      await dispatch(
        AddOrder({
          payload: {
            userId,
            customerEmail: userEmail,
            customerName: userName,
            customerPhone: userPhone,
            customerAddress: address,
            paidAmount: amount,
            orders: cartData,
            subTotal,
            totalPurchasedPrice,
            totalQuantity,
          },
          callback: async (data) => {
            if (data?.data?.status === 201) {
              toast.success(data?.data?.message);
            } else {
              toast.error(data?.data?.message);
            }
          },
        })
      );

      dispatch(handleEmptyCart());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setIsFormOpen(!isFormOpen);
    router.push("/products");
  };

  useEffect(() => {
    let sum = 0,
      purchasePriceSum = 0;
    cartData.forEach((item: any) => {
      sum += +item.product.price * +item.quantity;
      purchasePriceSum += item.product.purchasedPrice * +item.quantity;
    });
    if (cartData.length > 0) {
      setSubTotal(sum);
      setTotalPurchasedPrice(purchasePriceSum);
      console.log("subtotal", subTotal);
    }
  }, [cartData]);

  return {
    isFormOpen,
    setIsFormOpen,
    subTotal,
    setSubTotal,
    addOrder,
    cartData,
    isLoading,
    totalQuantity,
    isClicked,
    setIsClicked,
    address,
    AddressHandler,
    userPhone,
    setUserPhone,
    amount,
    setAmount,
  };
};

export default useCart;
