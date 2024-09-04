import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";

import Link from "next/link";

const Page = () => {
  return (
    <div className="border-2 flex flex-col gap-[22px] w-full py-[41px] px-[15%]">
      <p className="text-[32px] leading-[48px] text-darkGray font-bold font-albertSans">
        Settings
      </p>
      <Link href={`/settings/edit-profile`}>
        <CardWrapper height="" width="w-full" flexDirection="flex-row">
          <div className="flex justify-between w-full">
            <p className="font-[600] text-[18px]">Edit Profile</p>
            <CgProfile size={25} />
          </div>
        </CardWrapper>
      </Link>

      <Link href={`/settings/change-password/`}>
        <CardWrapper height="" width="w-full" flexDirection="flex-row">
          <div className="flex justify-between w-full">
            <p className="font-[600] text-[18px]">Change Password</p>
            <RiLockPasswordLine size={25} />
          </div>
        </CardWrapper>
      </Link>
    </div>
  );
};

export default Page;
