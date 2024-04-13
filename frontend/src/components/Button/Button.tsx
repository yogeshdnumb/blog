import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
