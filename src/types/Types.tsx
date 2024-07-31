import { StaticImageData } from "next/image";


type customer = {
  img: string | StaticImageData,
  customerName: string,
};

type product = {
  img: string,
  productName: string,
  productCategory:string
};

type order = {
  quantity : string,
  date : string
}



type tableHeading = {
  heading : string
};



type orderViewTableData = {
  product : product,
  totalOrder : order,
  status : string,
  price : string

}

///////MAKE CHANGES LATER
type documentsTableData = {
  documentName :product,
  type : string
  author : customer
  version : string
  status : string,


}




type dashboardtableData = {
  date : string,
  customer : customer,
  status : string,
  total : string

}

type customertableData = {
  customer : customer,
  email : string,
  phone : string
  address : string
  status : string,

}



export type TableProps = {
  width: string;
  height: string;
  pagination: boolean;
  divider: boolean;
  checkbox:boolean;
  heading: string;
  background:string
  bgHeader:string,
  bgRows:string,
  tableHeading : tableHeading[],
  tableData : dashboardtableData[] | customertableData[] | orderViewTableData[] | documentsTableData[]

};

export type IconProps = {
  fill: string;
  hover: string;
};


export type ButtonProps = {
  background: string;
  img: string | StaticImageData | null;
  width: string;
  rounded: string;
  gap: string;
  color: string;
  text: string | number;
  fontWeight: string;
  fontSize: string;
  px: string;
  py: string;
  lineHeight: string;
  border:string
};