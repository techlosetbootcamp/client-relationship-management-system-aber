import { axiosInstance } from "@/helpers/axiosInstance";
import { EditProfile, UpdateProfilePicture } from "@/redux/slices/user.slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useEditProfile = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  console.log(session);

  const [name, setName] = useState(session?.data?.user?.name);
  const [email, setEmail] = useState(session?.data?.user?.email);
  const [image, setImage] = useState(session?.data?.user?.image);

  const dispatch: AppDispatch = useDispatch();

  const updateProfile = async () => {
    console.log("I am clicked");

    dispatch(
      EditProfile({
        payload: {
          id: session.data?.user?.id,
          currentEmail: session.data?.user?.email,
          newEmail: email,
          name,
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

    console.log("Your profile has been updated");
  };
  useEffect(() => {
    if (session?.data?.user) {
      setName(session?.data?.user?.name ?? "");
      setEmail(session?.data?.user?.email ?? "");
    }
  }, [session]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    console.log("clicked");
    fileInputRef?.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file && userId) {
      // Handle the selected file here
      console.log(file);
      setImage(file);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", userId);

      console.log("payload before dispatch", formData);

     const data = await dispatch(
        UpdateProfilePicture({
          payload: { formData },
        })
      )

      await session.update({image:data?.payload?.response?.secure_url})

      // console.log("response in update profile", response)
      //  const imageResponse = await axiosInstance.post(
      //   "/user/update-profile-image",
      //   formData
      // );
      // console.log(imageResponse)

      // session.update({ image: imageResponse?.data?.response?.secure_url });

      // console.log(
      //   "change picture response",
      //   imageResponse,
      //   "session after change",
      //   session
      // );
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
  };
};

export default useEditProfile;
