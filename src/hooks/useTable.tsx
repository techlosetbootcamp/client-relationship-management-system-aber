import React, { useState } from "react";

const useTable = (tableData: any[]) => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState();

  const handleSelectAll = () => {
    const temp = !selectAll;
    setSelectAll(!selectAll);
    const checkedArray: any = {};
    tableData?.forEach((item) => {
      if ("id" in item) {
        checkedArray[item?.id] = temp;
      }
    });

    setCheckedItems(checkedArray);
  };

  const handleCheckbox = (e: any, id: string) => {
    const isChecked = e.target.checked;

    setCheckedItems((prevState: any) => {
      const newCheckedItems = {
        ...prevState,
        [id]: isChecked,
      };

      const allChecked = tableData.every(
        (item) => "id" in item && newCheckedItems[item?.id]
      );

      setSelectAll(allChecked);
      return newCheckedItems;
    });
  };

  const getCheckedItemIds = () => {
    return Object.keys(checkedItems).filter((id) => checkedItems[id]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const editItem = (item: any) => {
    setItem(item);
    toggleModal();
  };

  return {
    handleSelectAll,
    handleCheckbox,
    getCheckedItemIds,
    selectAll,
    checkedItems,
    editItem,
    toggleModal,
    item,
    isModalOpen,
  };
};

export default useTable;
