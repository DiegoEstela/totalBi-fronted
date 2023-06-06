"use client";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import "./Loader.css";
function Loader() {
  return (
    <div className="loaderComponent">
      <ThreeDots
        height="30"
        width="100"
        radius="9"
        color="#5690f2"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
