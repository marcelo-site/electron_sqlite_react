import styles from "./Input.module.css";

export const Input = ({
  type,
  name,
  placeholder,
  handleChange,
  value,
  label,
  readOnly,
}) => {
  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type || "text"}
        name={name}
        value={value}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={readOnly}
        spellCheck="false"
      />
    </div>
  );
};
