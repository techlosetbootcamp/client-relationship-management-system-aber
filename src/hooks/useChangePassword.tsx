import { ChangePassword } from "@/redux/slices/auth.slice";

import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import  { useState } from "react";
import { useDispatch } from "react-redux";

const useChangePassword = () => {
  const session = useSession();
  const email = session.data?.user?.email;
  const userId = session?.data?.user?.id;
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const onsubmit = async () => {
    dispatch(
      ChangePassword({
        payload: { currentPassword, newPassword, confirmNewPassword, userId },
      })
    )
      .then(async () => {
        console.log("password changes or not");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    onsubmit,
  };
};

export default useChangePassword;
