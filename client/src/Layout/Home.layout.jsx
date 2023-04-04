import React from "react";

//Components
import Navbar from "../Components/Navbar";

const HomeLayout = ({ element: Element, ...rest }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 lg:px-20">{Element}</div>
    </>
  );
};

export default HomeLayout;
