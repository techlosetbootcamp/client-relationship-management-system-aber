"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/helpers/axiosInstance";
import { format } from "date-fns";
import { BsFilePdf, BsFileWord, BsFileExcel } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import userAvatar from "@/assets/images/userAvatar.png";
import { useDispatch } from "react-redux";
import {
  AddDocument,
  EditDocument,
  GetDocument,
} from "@/redux/slices/document.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "@/helpers/toastify";
import { useSelector } from "react-redux";
import { documentValidation } from "@/validations/documentValidation";
import { FormatErrors } from "@/helpers/formatErrors";

const fileIcons: any = {
  pdf: <BsFilePdf size={32} />,
  doc: <BsFileWord size={32} />,
  docx: <BsFileWord size={32} />,
  xlsx: <BsFileExcel size={32} />,

  default: <FaRegFileAlt size={32} />, // A default icon for unsupported types
};

const useDocuments = (item?: any) => {
  console.log("i am the item man", item);
  const dispatch: AppDispatch = useDispatch();
  const docs = useSelector((state: RootState) => state.document.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocumentAdded, setIsDocumentAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<any>([]);
  const [version, setVersion] = useState<string>("");
  const [status, setStatus] = useState<string>("Select Status");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [fileURL, setFileURL] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);
  const [errorsMessages, setErrorMessages] = useState("");

  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
    setErrorMessages("");
  }, [errorsMessages]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // console.log("item in fileModal", item);
  const statusHandler = (status: string) => {
    setStatus(status);
    setIsClicked(false);
  };

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      setSelectedFile(file);
      console.log("selected file", file, selectedFile);
    }
  };

  const addDocument = async (
    userId: string,
    userName: string,
    userImage: string,
    toggleFunc: () => void
  ) => {
    const validation = documentValidation.safeParse({
      version,
      status,
    });

    if (!validation.success) {
      console.log("validation errors", validation.error.flatten().fieldErrors);
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));
      console.log(errorsMessages);
      return;
    }
    console.log("inside add document ");
    console.log("is model open", isModalOpen);
    // toggleFunc();
    console.log("is model open", isModalOpen);
    if (selectedFile) {
      console.log("selected file", selectedFile);
    }

    const formData = new FormData();
    if (selectedFile) {
      // formData.append("fileURL", fileURL);
      formData.append("file", selectedFile);
      formData.append("version", version);
      formData.append("status", status);
      formData.append("userId", userId);
      formData.append("userName", userName);
      formData.append("image", userImage);
    } else {
      toast.error("No file is selected");
      console.log("no file");
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(
        AddDocument({
          payload: { formData },
          callback: async (data) => {
            if (data?.data?.status === 201) {
              // setIsDocumentAdded(!isDocumentAdded);

              // await getDocuments();
              await dispatch(GetDocument());
              toast.success(data?.data?.message);
            } else {
              toast.error(data?.data?.message);
            }
          },
        })
      );
      setIsDocumentAdded(!isDocumentAdded);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDocumentAdded(!isDocumentAdded);
      toggleFunc();
      setIsLoading(false);
      setVersion("");
      setStatus("Select Status");
      setSelectedFile(null);
    }
  };

  const editDocument = async (toggleFunc: () => void) => {
    console.log("edit doc is clicked");
    // toggleModal();

    const validation = documentValidation.safeParse({
      version,
      status,
    });

    if (!validation.success) {
      console.log("validation errors", validation.error.flatten().fieldErrors);
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));
      console.log(errorsMessages);
      return;
    }

    try {
      setIsLoading(true);
      console.log("loading inside edit document", isLoading);
      await dispatch(
        EditDocument({
          payload: {
            version,
            status,
            id: item.id,
          },
          callback: async (data) => {
            if (data?.data?.status === 200) {
              // setIsDocumentAdded(!isDocumentAdded);

              // await getDocuments();
              await dispatch(GetDocument());
              toast.success(data?.data?.message);
            } else {
              toast.error(data?.data?.message);
            }
          },
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      toggleFunc();
      setIsLoading(false);
    }

    // const response = await axiosInstance.post("/documents/edit-document", {
    //   version,
    //   status,
    //   id: item.id,
    // });
    // console.log("edit-product response", response);
  };

  useEffect(() => {
    setStatus(item?.status ?? "Select Status");
    setVersion(item?.version ?? "");
  }, [item]);

  const getDocuments = async () => {
    console.log("inside get document funciotn");
    try {
      setIsLoading(true);
      await dispatch(GetDocument());
      // toast.success("Document list fetched successfully")
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // console.log("inside custom hook", docs);
    //  const documentData = await axiosInstance.get("/documents/get-documents");
    // console.log("get document", documentData.data.document);

    // const documentsArray = docs?.map((item: any) => {
    //   console.log("item", item);

    //   return {
    //     id: item.id,
    //     grpObject: {
    //       img: fileIcons[item.type] || fileIcons?.default,

    //       name: item.fileName,
    //       subValue: `Uploaded on ${format(
    //         new Date(item.CreatedAt),
    //         "dd MMMM, yyyy"
    //       )}`,
    //     },
    //     type: item.type,
    //     imgObject: {
    //       img: item.authorImage != "null" ? item.authorImage : userAvatar,
    //       name: item.authorName,
    //     },
    //     version: item.version,
    //     status: item.status,
    //     fileURL: item.fileURL,
    //   };
    // });
    // setDocument(documentsArray);

    console.log("get documents", document);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    if (docs && docs.length > 0) {
      const documentsArray = docs.map((item: any) => {
        console.log("item", item);

        return {
          id: item.id,
          grpObject: {
            img: fileIcons[item.type] || fileIcons?.default,
            name: item.fileName,
            subValue: `Uploaded on ${format(
              new Date(item.CreatedAt),
              "dd MMMM, yyyy"
            )}`,
          },
          type: item.type,
          imgObject: {
            img: item.authorImage !== "null" ? item.authorImage : userAvatar,
            name: item.authorName,
          },
          version: item.version,
          status: item.status,
          fileURL: item.fileURL,
        };
      });
      setDocument(documentsArray);
      console.log("Processed documents array", document);
    }
  }, [docs]); // Trigger this effect whenever `docs` changes

  return {
    isModalOpen,
    document,
    toggleModal,
    statusHandler,
    handleFileUpload,
    addDocument,
    editDocument,
    version,
    setVersion,
    status,
    setStatus,
    selectedFile,
    setSelectedFile,
    fileURL,
    setFileURL,
    isClicked,
    setIsClicked,
    isLoading,
  };
};

export default useDocuments;
