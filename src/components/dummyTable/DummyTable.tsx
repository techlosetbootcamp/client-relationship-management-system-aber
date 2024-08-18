import React from "react";
import "./rough.css"

const DummyTable = () => {
  return (
    <div className="w-full px-[100px]">
      {/* <style jsx>{`
        td:first-child,
        th:first-child {
          border-radius: 10px 0 0 10px;
          background-color: inherit; 
        }

        th:last-child,
        td:last-child {
          border-radius: 0 10px 10px 0;
          background-color: inherit; 
        }
      `}</style> */}

      <table className="w-full">
        <thead className="bg-transparent p-0">
          <tr className="bg-primaryPurple h-[47px] p-0">
            <th className="text-start p-0 bg-transparent overflow-hidden">
            Song
            </th>
            <th className=" text-start">Artist</th>
            <th className="text-start ">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr className="relative z-10 bg-secondaryGreen rounded-[20px] h-[47px] ">
            <td className="">
              <div className=" flex h-[47px] w-full">abc</div>
            </td>
            <td className="">def</td>
            <td className="">ghi</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DummyTable;
