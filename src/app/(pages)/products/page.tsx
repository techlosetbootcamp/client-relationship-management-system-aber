"use client";
import Cart from "@/components/cart/Cart";
import { Header } from "@/components/header/Header";
import ProductCard from "@/components/productCard/ProductCard";
import { axiosInstance } from "@/helpers/axiosInstance";
import { handleAddToCart } from "@/redux/slices/cart.slice";
import { RootState } from "@/redux/store";
import { ProductProps } from "@/types/Types";
import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const [toggle, setToggle] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cartProducts, setCartProducts] = useState<any>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const cartData = useSelector((state: RootState) => state.cart.cartData);
  console.log("cartdata from useSelector", cartData);

  const dispatch = useDispatch();
  const getProducts = async () => {
    const response = await axiosInstance.get("/products/get-products");
    console.log("get product response", response);
    setProductList(response.data.product);
  };

  const toggleCart = () => {
    setToggle(!toggle);
  };

  // id: string;
  // image: string;
  // productName: string;
  // category: string;
  // price: string;

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

    // const isProductPresent = cartProducts.find((item:ProductProps)=>item.id===product.id);

    // if(isProductPresent){
    //   const updatedCart = cartProducts.map((item:ProductProps)=>{
    //     if(item.id===product.id){
    //       console.log("inside if", item.productName);
    //       return {
    //         ...item,
    //         quantity : (+item.quantity +1).toString()
    //       }

    //     }
    //     console.log("after if",  item.productName)
    //     return item;
    //   })
    //   console.log("updated cart",updatedCart)
    //   setCartProducts(updatedCart)
    // }else{
    //   setCartProducts([...cartProducts,product])

    // }

    // setCartProducts([...cartProducts,product])
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on component unmount or when `toggle` changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [toggle]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let sum = 0;
    cartData.forEach((item) => {
      sum += +item.quantity;
    });
    setTotalQuantity(sum);
  }, [cartData]);
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
      <div className="grid grid-cols-4 gap-[8px]">
        {productList?.map((product: ProductProps) => {
          return (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                productName={product?.productName}
                category={product.category}
                price={product.price}
                image={product.image}
                onClick={() => addToCart(product)}
              />
            </div>
          );
        })}
      </div>
      {/* <div className={`flex justify-end fixed left-0 overflow-y-hidden overflow-x-hidden top-0 bottom-0 w-screen max-h-screen`}> */}
      {/* <div className={``}> */}

      <div
        className={`${
          toggle ? "translate-x-0 backdrop-brightness-50" : "translate-x-full"
        }  transition duration-150 ease-in-out  fixed right-0 overflow-x-hidden  border-2 border-red z-10`}
      >
        <Cart
          toggleCart={toggleCart}
          toggleVal={toggle}
          cartProducts={cartProducts}
          totalQuantity={totalQuantity}
        />
      </div>
      <div
        className={`${
          toggle ? "fixed inset-0 backdrop-brightness-50" : "hidden"
        } transition duration-150 ease-in-out`}
      ></div>
    </div>
  );
};

export default Page;
