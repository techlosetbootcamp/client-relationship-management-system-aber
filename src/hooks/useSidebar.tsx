import React, { useState } from "react";

const useSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleSidebar = () => {
    console.log("toggle is clicked", toggle);
    setToggle(!toggle);
  };

  return {
    toggleSidebar,
    toggle,
    setToggle,
  };
};

export default useSidebar;
