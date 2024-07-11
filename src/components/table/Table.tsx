import Avatar from "@/components/avatar/Avatar";
import React from "react";
import img from "@/assets/images/avatar.png";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import { TableProps } from "@/types/Types";
import Button from "@/components/button/Button";

const Table = ({ width, height }: TableProps) => {
  return (
    <CardWrapper width={width} height={height} flex="col">
      <div className={`flex justify-between w-full pb-[12px] font-barlow`}>
        <p>New Customers</p>
        <div>Pagination</div>
      </div>

      <div className="border border-borderGray w-full" />

      <div>
        <table className="table-fixed w-full border-separate border-spacing-y-[12px] font-barlow">
          <thead className="w-full my-[8px] text-[14px] leading-[21px] font-semibold text-darkGray bg-lightPurple rounded-[5px] px-[8px]">
            <tr className="">
              <th className="py-[8px] text-start">Date</th>
              <th className="py-[8px] text-start">Customer</th>
              <th className="py-[8px] text-start">Status</th>
              <th className="py-[8px] text-start">Total</th>
            </tr>
          </thead>
          <tbody className="w-full text-[14px] leading-[21px] p-[8px] rounded-[5px] font-medium text-mediumGray gap-[12px]">
            <tr className="border-2 border-blue">
              <td className="py-[8px] border border-spacing-2 text-start">
                312 Jul 2023
              </td>
              <td className="py-[8px] text-start border flex items-center gap-[8px]">
                <Avatar
                  img={img}
                  size="h-[31px] w-[31px] rounded-full"
                  background=""
                />
                <p>Jacob Swanson</p>
              </td>
              <td className="py-[8px] text-start border ">
                <Button
                  text={"Success"}
                  fontSize="text-[12px]"
                  img={""}
                  background={"bg-lightGreen"}
                  color={"text-secondaryGreen"}
                  width="w-fit"
                  gap="gap-[3px]"
                  fontWeight="font-bold"
                  rounded="rounded-[15.75px]"
                  lineHeight="leading-[18px]"
                  py="py-[0.75px]"
                  px="px-[6px]"
                />
              </td>
              <td className="py-[8px] text-start border ">$999.00</td>
            </tr>
            <tr className="border-2 border-blue">
              <td className="py-[8px] text-start border  ">31 Jul 2023</td>
              <td className="py-[8px] text-start border ">Jacob Swanson</td>
              <td className="py-[8px] text-start border">Button</td>
              <td className="py-[8px] text-start border ">$999.00</td>
            </tr>
            <tr className="border-2 border-blue">
              <td className="py-[8px] text-start">31 Jul 2023</td>
              <td className="py-[8px] text-start">Jacob Swanson</td>
              <td className="py-[8px] text-start">Button</td>
              <td className="py-[8px] text-start">$999.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardWrapper>
  );
};

export default Table;
