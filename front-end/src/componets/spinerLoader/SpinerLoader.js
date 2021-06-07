import React from "react";
import Loader from "react-loader-spinner";
import styles from "./SpinerLoader.module.css";


const SpinerLoader = () => {
  return (
    <Loader
      className={styles.loader}
      type="Circles"
      color="#212121"
      height="300px"
      width="300px"
    // timeout={3000}
    />
  );
};

export default SpinerLoader;
