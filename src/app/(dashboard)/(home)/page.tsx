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
    <main className="h-full my-[41px]">
      <div className="flex justify-between w-full mb-[56px] ">
        <div className="flex gap-[22px]  items-center">
          <Avatar
            img={avatarImg}
            size="h-[89px] w-[89px] rounded-full"
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

        <div className="h-[38px] w-[300px] rounded-[4px] overflow-hidden flex self-center">
          <InputField height={"h-full"} width=" w-[201px]" />
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
          />
        </div>
      </div>

      <div className="flex gap-[21px]">
        <div className="flex flex-col gap-[20px]">
          <div className="w-full ">
            <div className="flex gap-[21px] ">
              <div className="">
                <Card />
              </div>
              <div>
                <Card2 />
              </div>
            </div>
          </div>

          <div className="w-full flex gap-[21px]">
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

        <CardWrapper height="h-[500px]" width="w-[285px]" flex="col">
          <p className="text-[16px] leading-[24px] font-semibold text-darkGray font-barlow">
            Best Selling Products
          </p>
          <div className="border border-divider w-full" />
          <div className="flex flex-col gap-[12px]">
            {productsData.map((item,i) => {
              return (
                <div key={i} className="bg-lightGray w-full p-[8px] rounded-[5px] flex gap-[8px] items-center">
                  <Avatar
                    img={item.img}
                    size="h-[67px] w-[67px] rounded-[5px]"
                    background=""
                  />

                  <div className="flex items-center justify-between flex-1">
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-blue text-[14px] font-semibold leading-[16.8px] font-albertSans">
                        {item.itemName}
                      </p>
                      <p className="text-mediumGray leading-[16.8px] text-[14px] font-barlow">
                        {item.itemCategory}
                      </p>
                    </div>
                    <p className="text-blue text-[14px] font-semibold leading-[16.8px] font-albertSans">
                      {item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardWrapper>
      </div>
      <div className="flex gap-[21px] mt-[22px] ">
        <Table width="w-[741px]" height="h-[500px]" />

        <CardWrapper height="h-[500px]" width="w-[285px]" flex="col">
          <p className="text-[16px] leading-[24px] font-semibold text-darkGray font-barlow">
            City Order Statistics
          </p>
          <div className="border border-borderGray" />
          <div className="border h-full">Map</div>
        </CardWrapper>
      </div>
    </main>
  );
}
