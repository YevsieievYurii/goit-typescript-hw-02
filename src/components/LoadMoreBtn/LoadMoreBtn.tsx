import React from "react";
import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
