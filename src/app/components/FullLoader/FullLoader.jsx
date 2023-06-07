"use client";
import React from "react";
import { Puff } from "react-loader-spinner";
import "./FullLoader.css";

function FullLoader() {
  return (
    <div className="FullLoaderComponent">
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#5690f2"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default FullLoader;
