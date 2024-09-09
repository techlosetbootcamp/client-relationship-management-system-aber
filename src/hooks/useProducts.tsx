"use client";
import { axiosInstance } from "@/helpers/axiosInstance";
import { FormatErrors } from "@/helpers/formatErrors";
import { toast } from "@/helpers/toastify";
import { handleAddToCart } from "@/redux/slices/cart.slice";
import { RootState } from "@/redux/store";
import { ProductProps } from "@/types/Types";
import { productValidation } from "@/validations/productValidation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProducts = (item: any) => {
  const cartData = useSelector((state: RootState) => state.cart.cartData);
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [productList, setProductList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fotmattedProducts, setFormattedProducts] = useState<any>([]);
  const [productName, setProductName] = useState<string>("");
  const [totalStock, setTotalStock] = useState<string>("Total Stock");
  const [category, setCategory] = useState<string>("Select Category");
  const [price, setPrice] = useState("");
  const [purchasedPrice, setPurchasedPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isClicked, setIsClicked] = useState(false);
  const [errorsMessages, setErrorMessages] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
    setErrorMessages("");
  }, [errorsMessages]);

  const CategoryHandler = (category: string) => {
    setCategory(category);
    setIsClicked(false);
  };

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      setSelectedFile(file);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getFormattedProducts = async () => {
    const productData = await axiosInstance.get("/products/get-products");

    const productsArray = productData.data.product.map((item: any) => {
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
          purchasedPrice: product.purchasedPrice,
          price: product.price,
        },
        quantity: 1,
      })
    );
  };

  useEffect(() => {
    setProductName(item?.imgObject?.name ?? "");
    setCategory(item?.category ?? "Select Category");
    setTotalStock(item?.totalStock ?? "Total Stock");
    setPrice(item?.price ?? "");
    setPurchasedPrice(item?.purchasedPrice ?? "");
  }, [item]);

  const addProduct = async (toggleFunc: () => void) => {
    const validation = productValidation.safeParse({
      productName,
      category,
      totalStock: parseInt(totalStock, 10),
      price: parseInt(price, 10),
      purchasedPrice: parseInt(purchasedPrice, 10),
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
    }

    // toggleModal();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("productName", productName);
      formData.append("purchasedPrice", purchasedPrice);
      formData.append("price", price);
      formData.append("totalStock", totalStock);
      formData.append("category", category);
      formData.append("image", selectedFile);
      // const response = await axiosInstance.post(
      //   "/products/add-product",
      //   formData
      // );
    } else {
      toast.error("product image is not selected");

      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        "/products/add-product",
        formData
      );

      await getProducts();
    } catch (error) {
      console.log(error);
    } finally {
      toggleFunc();
      setIsLoading(false);
    }
  };

  const editProduct = async (toggleFunc: () => void) => {
    const validation = productValidation.safeParse({
      productName,
      category,
      totalStock: parseInt(totalStock, 10),
      price: parseInt(price, 10),
      purchasedPrice: parseInt(purchasedPrice, 10),
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
    }

    toggleModal();

    const formData = new FormData();
    formData.append("id", item?.id);
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("purchasedPrice", purchasedPrice);
    formData.append("totalStock", totalStock);
    formData.append("category", category);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        "/products/edit-product",
        formData
      );
      await getProducts();
    } catch (error) {
      console.log(error);
    } finally {
      toggleFunc();
      setIsLoading(false);
    }
  };

  const deleteProduct = async (item: any) => {
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/products/delete-product", {
        id: item.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
    CategoryHandler,
    handleFileUpload,
    addProduct,
    editProduct,
    productName,
    setProductName,
    totalStock,
    setTotalStock,
    category,
    setCategory,
    price,
    setPrice,
    purchasedPrice,
    setPurchasedPrice,
    isClicked,
    setIsClicked,
    isLoading,
    deleteProduct,
  };
};

export default useProducts;
