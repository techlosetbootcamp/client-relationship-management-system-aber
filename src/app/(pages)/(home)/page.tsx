"use client";    //fix it later on
import Avatar from "@/components/avatar/Avatar";
import InputField from "@/components/inputField/InputField";
import Button from "@/components/button/Button";
import Image from "next/image";
import Card from "@/components/card/Card";
import Card2 from "@/components/card2/Card2";
import iconImg from "@/assets/images/searchIcon.svg";
import avatarImg from "@/assets/images/avatar.png";
import GraphCard from "@/components/graphCard/GraphCard";
import productImg from "@/assets/images/productImg.svg";
import Table from "@/components/table/Table";
import { CardWrapper } from "@/components/cardWrapper/CardWrapper";
import img from "@/assets/images/ArrowUp.svg";
import dynamic from "next/dynamic";
import { DashboardTableHeadings } from "@/constants/TableHeadings";
import { DashboardTableData } from "@/constants/TableData";
const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});

const productsData = [
  {
    img: productImg,
    itemName: "Ceramic Bowls",
    itemCategory: "HomeGoods",
    price: "$29",
  },
  {
    img: productImg,
    itemName: "Ceramic Bowls",
    itemCategory: "HomeGoods",
    price: "$29",
  },
  {
    img: productImg,
    itemName: "Ceramic Bowls",
    itemCategory: "HomeGoods",
    price: "$29",
  },
  {
    img: productImg,
    itemName: "Ceramic Bowls",
    itemCategory: "HomeGoods",
    price: "$29",
  },
];

export default function Home() {
  return (
    <main className="h-full my-[41px] w-full border  box-border">
      <div className="flex justify-between w-full border-2 mb-[56px] box-border ">
        <div className="flex gap-[22px]  items-center">
          <Avatar
            img={avatarImg}
            size="lg:h-[80.1px] lg:w-[80.1px] xl:h-[89px] xl:w-[89px] rounded-full"
            background=""
          />

          <div className="py-[14.5px]">
            <p className="text-[24px] leading-[36px] text-darkGray font-albertSans font-[700]">
              Welcome Back,&nbsp;
              <span className="text-primaryPurple">Sophia Chester</span>
            </p>
            <p className="text-[15px] text-mediumGray leading-[22.5px] font-barlow font-semibold">
              Here are your monthly store updates.
            </p>
          </div>
        </div>

        <div className="h-[38px] w-[300px] rounded-[4px] xs:hidden md:flex self-center">
          <InputField
            placeholder="Type Here"
            value=""
            height={"h-full"}
            width=" w-[201px]"
            rounded="rounded-[0px]"
            onChange={()=>{}}
          />
          <Button
            text={"Search"}
            fontSize="text-[16px]"
            fontWeight="font-semibold"
            color="text-white"
            background="bg-primaryPurple"
            img={iconImg}
            width="w-[99px]"
            rounded="none"
            gap="gap-[8px]"
            py="py-[6px]"
            px="px-[12px]"
            lineHeight="leading-[24px]"
            border=""
          />
        </div>
      </div>

      <div className="flex sm:gap-[20.55px] md:gap-[17.18px] xl:gap-[21px] lg:flex-row xs:flex-col w-full justify-between box-border ">
        <div className="flex flex-col gap-[20px]">
          <div className="w-full box-border ">
            <div className="flex md:flex-row xs:flex-col gap-[21px] w-full flex-1 ">
              <Card />

              <Card2 />
            </div>
          </div>

          <div className="w-full flex sm:gap-[17.18px] xl:gap-[21px] overflow-hidden">
            <GraphCard
              btnText="3.4%"
              color="text-secondaryGreen"
              background="bg-lightGreen"
              img={img}
            />
            <GraphCard
              btnText="2.6%"
              color="text-secondaryRed"
              background="bg-lightRed"
              img={img}
            />
            <GraphCard
              btnText="10%"
              color="text-secondaryBlue"
              background="bg-lightBlue"
              img={img}
            />
          </div>
        </div>

        <CardWrapper
          height="lg:h-[409px] xl:h-[500px]"
          width="lg:w-[233px] xl:w-[285px] "
          flex="flex-col  flex-1"
        >
          <p className="text-[16px] leading-[24px] font-semibold text-darkGray font-barlow">
            Best Selling Products
          </p>
          <div className="border border-divider w-full" />
          <div className="flex flex-col  gap-[12px]">
            {productsData.map((item, i) => {
              return (
                <div
                  key={i}
                  className="bg-lightGray w-full p-[8px] rounded-[5px] flex gap-[8px] items-center"
                >
                  <Avatar
                    img={item.img}
                    size="lg:h-[55px] lg:w-[55px]  xl:h-[67px] xl:w-[67px] rounded-[5px]"
                    background=""
                  />

                  <div className="flex items-center justify-between flex-1">
                    <div className="flex flex-col lg:gap-[6.54px] xl:gap-[8px]">
                      <p className="text-blue  font-semibold lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-albertSans">
                        {item.itemName}
                      </p>
                      <p className="text-mediumGray lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px] font-barlow">
                        {item.itemCategory}
                      </p>
                    </div>
                    <p className="text-blue font-semibold lg:text-[12px] xl:text-[14px] lg:leading-[14.4px] xl:leading-[16.8px]  font-albertSans">
                      {item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardWrapper>
      </div>
      <div className="flex xs:flex-col lg:flex-row sm:gap-[41.56px] md:gap-[17.18px] xl:gap-[21px] mt-[22px] ">
        <Table
        heading="New Customers"
        background="bg-white"
          width="lg:w-[606px] xl:w-[741px]"
          height="lg:h-[412px] xl:h-[500px]"
          pagination = {true}
          divider={true}
          checkbox={false}
          bgHeader="bg-lightPurple"
          bgRows="bg-white"
          tableHeading={DashboardTableHeadings}
          tableData={DashboardTableData}

        />

        <CardWrapper
          height="sm:h-[409px] xl:h-[500px]"
          width="lg:w-[233px] xl:w-[285px] "
          flex="flex-col flex-1"
        >
          <p className="text-[16px] leading-[24px] font-semibold text-darkGray font-barlow">
            City Order Statistics
          </p>
          <div className="border border-borderGray" />
          <div className="border h-full">
          <Map hover={true} fill={true} zoom={4} longitude={38.0311988} latitude={-102.1390331}/>
          </div>
        </CardWrapper>
      </div>
    </main>
  );
}
