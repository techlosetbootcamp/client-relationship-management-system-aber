import React from "react";

type InputProps = {
  height: string,
  width : string
};

const InputField = ({ height, width }: InputProps) => {


  return (
    <div>
      <input
        placeholder="Type Here"
        className={ `${height} ${width} bg-white border border-lightestGray px-[12px] py-[6px] placeholder:font-albertSans`}
      />
    </div>
  );
};

export default InputField;
