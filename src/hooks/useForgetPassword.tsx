import { ForgetPassword } from "@/redux/slices/auth.slice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useForgetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const onSubmit = async () => {
    console.log("button is clicked", email);
    dispatch(
      ForgetPassword({
        payload: { email },
      })
    );
  };

  return {
    email,
    setEmail,
    onSubmit,
  };
};

export default useForgetPassword;
