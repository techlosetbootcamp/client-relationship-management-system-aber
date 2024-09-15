import { FormatErrors } from "@/helpers/formatErrors";
import { SignOutHandler } from "@/helpers/SignOutHandler";
import { toast } from "@/helpers/toastify";
import { ChangePassword } from "@/redux/slices/auth.slice";

import { AppDispatch } from "@/redux/store";
import { authValidation } from "@/validations/authValidation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useChangePassword = () => {
  const session = useSession();
  const email = session.data?.user?.email;
  const userId = session?.data?.user?.id;
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMessages, setErrorMessages] = useState("");

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const onsubmit = async () => {
    const validation = authValidation.changePasswordValidation.safeParse({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
    }
    try {
      setIsLoading(true);

      await dispatch(
        ChangePassword({
          payload: { currentPassword, newPassword, confirmNewPassword, userId },
          callback: async (data) => {
            if (data?.data?.status === 200) {
              await SignOutHandler();
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
      setIsLoading(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    onsubmit,
    isLoading,
  };
};

export default useChangePassword;
