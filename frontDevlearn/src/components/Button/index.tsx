/* eslint-disable react/react-in-jsx-scope */
import { ButtonHTMLAttributes } from "react";

import "./styles.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ ...props }: ButtonProps): JSX.Element {
  return (
    <>
      <button className={"button"} {...props}></button>
    </>
  );
}
