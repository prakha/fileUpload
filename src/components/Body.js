import React from "react";
import ReactDom from "react-dom"
import DataUpload from "./DataUpload";


const Body= () => {
    return (
      <>
        <div className="place-content-center" style = {{"margin":"150px"}}>
          <DataUpload />
        </div>
      </>
    );
};

export default Body;