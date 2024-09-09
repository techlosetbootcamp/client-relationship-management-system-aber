import { signOut } from "next-auth/react";

export const SignOutHandler = async () => {
    console.log("SIgnput Button is clikced");
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };
  