"use client";
import React from "react";
import { Blocks } from "react-loader-spinner";
import "./FullLoader.css";

function FullLoader() {
  return (
    <div className="loaderComponent">
      <Blocks
        visible={true}
        height="150"
        width="150"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
}

export default FullLoader;
