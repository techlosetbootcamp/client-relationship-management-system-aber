import { CountrySalesStats } from "@/components/countrySalesStats/CountrySalesStats";
import { Header } from "@/components/header/Header";
import Table from "@/components/table/Table";
import { WeeklySalesStats } from "@/components/weeklySalesStats/WeeklySalesStats";
import { OrderViewTableData } from "@/constants/TableData";
import { OrderOverviewTableHeadings } from "@/constants/TableHeadings";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col w-full gap-[22px]">
      <Header text="Order Overview" avatar={true}/>

      <div className="flex xs:flex-col md:flex-row xs:gap-[20px] md:gap-[21.58px] xl:gap-[26px] justify-between">
        <div className="flex flex-col flex-1 md:w-[523px] xl:w-[631px] xs:gap-[20px] md:gap-[8px] lg:gap-[16.6px] xl:gap-[20px]">
          <WeeklySalesStats />
          <Table
            heading="Best Selling Products"
            width="w-full"
            height="md:h-[334px] xl:h-[403px]"
            pagination={false}
            divider={true}
            bgHeader="bg-lightPurple"
            bgRows="bg-white"
            background="bg-white"
            checkbox={false}
            rowBorder={false}
            action={false}
            tableHeading={OrderOverviewTableHeadings}
            tableData={OrderViewTableData}


          />
        </div>

        <CountrySalesStats />
      </div>
    </div>
  );
};

export default Page;
