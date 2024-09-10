import React, { useState } from "react";

const useSidebar = () => {
  const [toggle, setToggle] = useState(false);
  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return {
    toggleSidebar,
    toggle,
    setToggle,
  };
};

export default useSidebar;
