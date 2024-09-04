"use client";
import { axiosInstance } from "@/helpers/axiosInstance";
import { handleAddToCart } from "@/redux/slices/cart.slice";
import { RootState } from "@/redux/store";
import { ProductProps } from "@/types/Types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProducts = () => {
  const cartData = useSelector((state: RootState) => state.cart.cartData);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [productList, setProductList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fotmattedProducts, setFormattedProducts] = useState<any>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getFormattedProducts = async () => {
    const productData = await axiosInstance.get("/products/get-products");
    console.log("get products", productData.data.product);

    const productsArray = productData.data.product.map((item: any) => {
      console.log("item", item);

      return {
        id: item.id,
        imgObject: {
          img: item.image,
          name: item.productName,
        },
        totalStock: item.totalStock,
        purchasedPrice: item.purchasedPrice,
        price: item.price,
        category: item.category,
      };
    });
    setFormattedProducts(productsArray);
  };

  const getProducts = async () => {
    const response = await axiosInstance.get("/products/get-products");
    console.log("get product response", response);
    setProductList(response.data.product);
  };

  const toggleCart = () => {
    setToggle(!toggle);
  };

  const addToCart = (product: ProductProps) => {
    dispatch(
      handleAddToCart({
        product: {
          id: product.id,
          image: product.image,
          productName: product.productName,
          category: product.category,
          price: product.price,
        },
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    getFormattedProducts();
  }, []);

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [toggle]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let sum = 0;
    cartData.forEach((item: any) => {
      sum += +item.quantity;
    });
    setTotalQuantity(sum);
  }, [cartData]);
  return {
    toggle,
    productList,
    totalQuantity,
    toggleCart,
    addToCart,
    toggleModal,
    fotmattedProducts,
    isModalOpen,
  };
};

export default useProducts;
