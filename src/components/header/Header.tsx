import React from "react";
import Avatar from "@/components/avatar/Avatar";
import avatarImg from "@/assets/images/avatar.png";

type HeaderProps = {
  text: string;
};
export const Header = ({ text }: HeaderProps) => {
  return (
    <div className="flex justify-between py-[41px]">
      <p className="text-[32px] leading-[48px] text-darkGray font-bold font-albertSans">
        {text}
      </p>
      <div className="flex gap-[8px] items-center">
        <Avatar
          img={avatarImg}
          size="h-[53px] w-[53px] rounded-full"
          background=""
        />
        <p className="text-[16px] leading-[24px] font-bold text-darkGray font-albertSans">
          Sophia Chester
        </p>
      </div>
    </div>
  );
};
