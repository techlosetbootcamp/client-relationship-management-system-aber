import { FormatErrors } from "@/helpers/formatErrors";
import { toast } from "@/helpers/toastify";
import { ForgetPassword } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";
import { authValidation } from "@/validations/authValidation";
import router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useForgetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorsMessages, setErrorMessages] = useState("");

  useEffect(() => {
    if (errorsMessages) {
      toast.error(errorsMessages);
    }
  }, [errorsMessages]);

  const onSubmit = async () => {
    const validation = authValidation.forgetPasswordValidation.safeParse({
      email,
    });

    if (!validation.success) {
      setErrorMessages(FormatErrors(validation.error.flatten().fieldErrors));

      return;
    }

    try {
      setIsLoading(true);

      await dispatch(
        ForgetPassword({
          payload: { email },
          callback: handleResponse,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = (data: any) => {
    if (data?.data.status === 200) {
      toast.success(data.data.message);
    } else {
      toast.error(null);
    }
  };

  return {
    email,
    setEmail,
    onSubmit,
    isLoading,
  };
};

export default useForgetPassword;
