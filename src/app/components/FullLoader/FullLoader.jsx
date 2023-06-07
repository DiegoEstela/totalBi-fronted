"use client";
import React from "react";
import { Puff } from "react-loader-spinner";
import "./FullLoader.css";

function FullLoader() {
  return (
    <div className="loaderComponent">
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default FullLoader;
