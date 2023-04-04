import React from "react";
import { Route, Routes } from "react-router-dom";

//Layout
import HomeLayout from "../Layout/Home.layout";

const HomeLayoutHOC = ({ element: Element, ...rest }) => {
  return (
    <>
      <Routes>
        <Route {...rest} element={<HomeLayout element={Element} />} />
      </Routes>
    </>
  );
};

export default HomeLayoutHOC;
