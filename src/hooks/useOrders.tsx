import { toast } from "@/helpers/toastify";
import { GetOrderById, GetOrders } from "@/redux/slices/order.slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useOrders = () => {
  const dispatch: AppDispatch = useDispatch();
  const [orderList, setOrderList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderById, setOrderById] = useState<any>([]);

  const order = useSelector((state: RootState) => state.order.data);
  const orderByIdResponse: any = useSelector(
    (state: RootState) => state.order.orderById
  );

  useEffect(() => {
    if (order && order.length > 0) {
      const orderListArray = order?.map((item: any) => {
        return {
          orderId: item.id,
          customerId: item.userId,
          customer: item.customerName,
          email: item.customerEmail,
          contact: item.customerPhone,
          address: item.customerAddress,
          orders: "Click Here to View",
          totalQuantity: item.totalQuantity,
          subTotal: `$${item.subTotal}`,
        };
      });
      setOrderList(orderListArray);
    }
  }, [order]);

  const getOrders = async () => {
    try {
      setIsLoading(true);
      await dispatch(GetOrders());

      // toast.success("Order list fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (orderId: string, toggleFunc: () => void) => {
    try {
      dispatch(
        GetOrderById({
          payload: { orderId },
        })
      );
    } catch (error) {
      console.log(error);
    }

    toggleFunc();
  };

  useEffect(() => {
    setOrderById(orderByIdResponse?.order?.orders);
  }, [orderByIdResponse]);

  useEffect(() => {
    getOrders();
  }, []);
  return {
    isLoading,
    orderList,
    getOrderById,
    orderById,
  };
};

export default useOrders;
