import React from "react";
import "../style/Loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
