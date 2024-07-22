import React from "react";

type InputProps = {
  height: string,
  width : string,
  rounded:string,
  placeholder : string
};

const InputField = ({ height, width, rounded, placeholder}: InputProps) => {


  return (
    <div>
      <input
        placeholder={placeholder}
        className={ `${height} ${width} ${rounded} bg-white border border-lightestGray px-[12px] py-[6px] placeholder:font-albertSans`}
      />
    </div>
  );
};

export default InputField;
