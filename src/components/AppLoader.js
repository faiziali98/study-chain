import React from 'react';
import '../css/Loader.css'; // Create a CSS file for styling
import { GooeyCircleLoader } from "react-loaders-kit";

const AppLoader = ({ showHeading, message }) => {
  const loaderProps = {
    loading: true,
    size: 275,
    duration: 2,
    colors: ["#99fffe", "#f42e00", "#042549"],
  };

  return (
    <div className="loader-container" style={{ flexDirection: "column" }}>
      {showHeading && (
        <>
          <h1 style={{ margin: "0px" }}>StudyChain</h1>
          <p>Together We Learn</p>
        </>
      )}
      <GooeyCircleLoader {...loaderProps} />
    </div>
  );
};

export default AppLoader;
