import React from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>{message || "Oops! Something went wrong."}</p>
    </div>
  );
};

export default ErrorMessage;
