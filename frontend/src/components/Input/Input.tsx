import styles from "./Input.module.scss";

interface InputProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
}

export default function Input({
  id,
  name,
  label,
  placeholder = "",
  type = "text",
  required = false,
  onChange,
}: InputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}
