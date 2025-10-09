import React, { Fragment } from "react";
import "./Base.css";



const Base = ({ name, children, width, className = "modal shop-modal p-4 bg-gray-900 rounded-lg shadow" }) => {
  /* const handleSubmit = () => {
    console.log("isSubmit");
  }; */

  //JSX RENDER
  return (
    <Fragment>
      <div className="flex justify-center items-center h-screen inset-0">
        <div className={`${className}`} style={width ? { width } : {}}>
          <div className="modal-content">
            <div className="modal-header mb-5">
              <h5 className="modal-title text-lg font-bold mb-1 text-left">
                {name}
              </h5>
              <hr />
            </div>
            <div className="modal-body mt-4 text-left">{children}</div>
            {/* <div className="modal-footer mt-4 text-center absolute hover:bg-green-900 bg-green-500 cursor-pointer rounded-lg">
              <button
                onClick={handleSubmit}
                className="btn text-white px-4 py-2 rounded bg-green-500"
              >
                <b>VALIDER</b>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
}; 


export default Base;
