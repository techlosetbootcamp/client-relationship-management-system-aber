import { useSession } from "next-auth/react";

const useSessionData = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const userName = session?.data?.user?.name;
  const userEmail = session?.data?.user?.email;
  const userImage = session.data?.user?.image;
  return { userId, userName, userEmail, userImage };
};

export default useSessionData;
