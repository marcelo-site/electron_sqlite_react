export const Button = ({ text, handleClick, type }) => {
  return (
    <button onClick={handleClick} className={`btn btn-${type}`}>
      {text}
    </button>
  );
};
