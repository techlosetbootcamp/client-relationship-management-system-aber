import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { IconBaseProps, IconType } from "react-icons/lib";

type imgObject = {
  img: string | StaticImageData;
  name: string;
};

type grpObject = {
  img: string;
  name: string;
  subValue: string;
};

type order = {
  quantity: string;
  date: string;
};

type tableHeading = {
  heading: string;
};

type orderViewTableData = {
  grpObject: grpObject;
  totalOrder: order;
  status: string;
  price: string;
};

///////MAKE CHANGES LATER
type documentsTableData = {
  grpObject: grpObject;
  type: string;
  imgObject: imgObject;
  version: string;
  status: string;
};

type dashboardtableData = {
  date: string;
  imgObject: imgObject;
  status: string;
  total: string;
};

type customertableData = {
  imgObject: imgObject;
  email: string;
  phone: string;
  address: string;
  status: string;
};

type productTableData = {
  imgObject: imgObject;
  quantity: number;
  price: string;
  category: string;
};

export type TableProps = {
  width: string;
  height: string;
  pagination: boolean;
  divider: boolean;
  checkbox: boolean;
  heading: string;
  background: string;
  bgHeader: string;
  bgRows: string;
  action: boolean;
  rowBorder: boolean;
  tableHeading: tableHeading[];
  tableData:
    | dashboardtableData[]
    | customertableData[]
    | orderViewTableData[]
    | documentsTableData[]
    | productTableData[];
};

export type IconProps = {
  fill: string;
  hover: string;
};

export type ButtonProps = {
  background: string;
  img: string | StaticImageData | null;
  Icon?: IconType | null;
  rounded: string;
  gap: string;
  color: string;
  text: string | number;
  fontWeight: string;
  fontSize: string;
  px: string;
  py: string;
  lineHeight: string;
  border: string;
  width: string;
};

export type StatusTagProps = {
  background: string;
  img: string | StaticImageData | null;
  Icon?: IconType | null;
  color: string;
  text: string | number;
  fontSize: string;
  lineHeight: string;
};
