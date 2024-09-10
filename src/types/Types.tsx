import { StaticImageData } from "next/image";
import { ReactNode, ReactElement, Dispatch, SetStateAction } from "react";
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
  id: string;
  grpObject: grpObject;
  totalOrder: order;
  status: string;
  price: string;
};

type ordersTableData = {
  orderId:string;
  customerId: string;
  customer: string;
  email: string;
  contact: string;
  address: string;
  orders: "Click Here to View";
  totalQuantity: number;
  subTotal: number;
};

export type documentsTableData = {
  id: string;
  fileURL: string;
  grpObject: grpObject;
  type: string;
  imgObject: imgObject;
  version: string;
  status: string;
};

type dashboardtableData = {
  id: string;
  date: string;
  imgObject: imgObject;
  status: string;
  total: string;
};

type customertableData = {
  id: string;
  imgObject: imgObject;
  email: string;
  phone: string;
  address: string;
  status: string;
};

type productTableData = {
  id: string;
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
  page?: string;
  tableHeading: tableHeading[];
  tableData:
    | dashboardtableData[]
    | customertableData[]
    | orderViewTableData[]
    | documentsTableData[]
    | productTableData[]
    | ordersTableData[];
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
  disabled: boolean;
  onClick: () => void;
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

export type ProductProps = {
  id: string;
  image: string;
  productName: string;
  category: string;
  purchasedPrice : number;
  price: number;
  totalStock: number;
};

export type AvatarProps = {
  height: string;
  width: string;
  radius: string;
  background: string;
  img: string | StaticImageData | ReactElement;
};

export type CardWrapperProps = {
  height: string;
  width: string;
  flexDirection: string;
  children: ReactNode;
};

export type CartCardProps = {
  image : string ,
  category : string,
  productName : string,
  price : string,
  quantity : string,
  id : string,
  type : string,

}


export type DocumentUploadModalProps = {
  toggleModal: () => void;
  item?: any;
};

export type GraphCardProps = {
  btnText: string;
  img: string | StaticImageData;
  color: string;
  background: string;
  text: string;
  chart: string;
};

export type HeaderProps = {
  text: string;
  avatar : boolean
};

export type SelectionRange = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type CalenderProps = {
  range: SelectionRange[];
  setRange: Dispatch<SetStateAction<SelectionRange[]>>;
  startDate: string;
  startDay: string;
  endDay: string;
  month: string;
  year: string;
  formattedStartDate: string;
  formattedEndDate: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type SidebarContextType = {
  toggleSidebar: () => void;
  toggle: boolean;
};

export type AddOrderArgs = {
  payload: {
    userId: string;
    customerEmail: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    paidAmount: string;
    orders: any[];
    subTotal: number;
    totalPurchasedPrice: number;
    totalQuantity: number;
  };
  callback: (data: any) => void;
};

export type GetOrderByDateArgs = {
  payload: {
    startDate: string | null;
    endDate: string | null;
  };
  callback: (data: any) => void;
};