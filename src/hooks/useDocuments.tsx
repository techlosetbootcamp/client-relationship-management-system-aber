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

  const statusHandler = (status: string) => {
    setStatus(status);
    setIsClicked(false);
  };

  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      setSelectedFile(file);
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
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
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
    const validation = documentValidation.safeParse({
      version,
      status,
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));
      return;
    }

    try {
      setIsLoading(true);

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
  };

  const deleteDocuments = async (getCheckedItemIds: () => void) => {
    const checkedItemsIds = getCheckedItemIds();
    try {
      setIsLoading(true);
      const response = await axiosInstance.post("/documents/delete-documents", {
        checkedItemsIds,
      });
      await dispatch(GetDocument());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadDocuments = async (getCheckedItemIds: () => void) => {
    const checkedItemsIds = getCheckedItemIds();

    try {
      const response = await axiosInstance.post(
        "/documents/download-documents",
        { checkedItemsIds }
      );

      if (response.data.documents.length > 0) {
        response.data.documents.map(async (doc: any) => {
          if (doc && doc.type && doc.fileName && doc.fileURL) {
            const filePath = doc.fileName + "." + doc.type;
            const fetchURL = await fetch(doc.fileURL);
            if (!fetchURL.ok) throw new Error("Network response was not ok");

            const blob = await fetchURL.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = blobUrl;
            link.download = filePath;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
          }
        });
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    setStatus(item?.status ?? "Select Status");
    setVersion(item?.version ?? "");
  }, [item]);

  const getDocuments = async () => {
    try {
      setIsLoading(true);
      await dispatch(GetDocument());
      // toast.success("Document list fetched successfully")
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    if (docs && docs.length > 0) {
      const documentsArray = docs.map((item: any) => {
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
    }
  }, [docs]);

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
    deleteDocuments,
    downloadDocuments,
  };
};

export default useDocuments;
