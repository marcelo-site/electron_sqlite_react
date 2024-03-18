export const Button = ({ text, handleClick, type, sizeContainer }) => {
  return (
    <div style={{ width: `${sizeContainer}px`, margin: "auto" }}>
      <button onClick={handleClick} className={`btn btn-${type}`}>
        {text}
      </button>
    </div>
  );
};
