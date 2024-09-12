import { ChangeEventHandler } from "react";
import styles from "./Input.module.css";

interface Props {
  type: string;
  placeholder?: string;
  disabled?: boolean;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Input = ({ onChange, type, value, disabled, placeholder }: Props) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      className={styles.input}
      disabled={disabled}
      onChange={onChange}
    />
  );
};
export default Input;
