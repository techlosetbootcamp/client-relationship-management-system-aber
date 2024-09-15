import { axiosInstance } from "@/helpers/axiosInstance";
import { FormatErrors } from "@/helpers/formatErrors";
import { toast } from "@/helpers/toastify";
import { EditProfile, UpdateProfilePicture } from "@/redux/slices/user.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { authValidation } from "@/validations/authValidation";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useEditProfile = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [name, setName] = useState(session?.data?.user?.name);
  const [email, setEmail] = useState(session?.data?.user?.email);
  const [image, setImage] = useState(session?.data?.user?.image);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMessages, setErrorMessages] = useState("");

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const updateProfile = async () => {
    const validation = authValidation.updateUserValidation.safeParse({
      name,
      email,
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
    }
    try {
      setIsLoading(true);

      await dispatch(
        EditProfile({
          payload: {
            id: session.data?.user?.id,
            currentEmail: session.data?.user?.email,
            newEmail: email,
            name,
          },
          callback: async (data) => {
            if (data?.data?.status === 200) {
              toast.success(data?.data?.message);
            } else {
              toast.error(null);
            }
          },
        })
      )
        .then(async () => {
          await session.update({
            name: name,
            email: email,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (session?.data?.user) {
      setName(session?.data?.user?.name ?? "");
      setEmail(session?.data?.user?.email ?? "");
    }
  }, [session]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file && userId) {
      setImage(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId);

      try {
        setIsProfileLoading(true);

        const data = await dispatch(
          UpdateProfilePicture({
            payload: { formData },
            callback: async (data) => {
              if (data?.data?.status === 200) {
                toast.success(data?.data?.message);
              } else {
                toast.error(null);
              }
            },
          })
        );

        await session.update({ image: data?.payload?.response?.secure_url });
      } catch (error) {
        console.log(error);
      } finally {
        setIsProfileLoading(false);
      }
    }
  };
  return {
    name,
    setName,
    email,
    setEmail,
    handleFileChange,
    handleButtonClick,
    updateProfile,
    fileInputRef,
    session,
    isProfileLoading,
    isLoading,
  };
};

export default useEditProfile;
