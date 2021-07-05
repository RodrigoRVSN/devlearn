import { CircularProgress } from "@material-ui/core";
import React from "react";
import "./styles.scss";

const Loading: React.FC = () => {
  return (
    <>
      <div className="loading-page">
        <div className="loading">
          <p>DEV LEARN</p>
          <CircularProgress />
        </div>
      </div>
    </>
  );
};

export default Loading;
