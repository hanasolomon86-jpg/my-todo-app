const Button = ({
  text,
  onClick,
  className = "",
  type = "button",
  title = "",
}) => {
  return (
    <button onClick={onClick} className={className} type={type} title={title}>
      {text}
    </button>
  );
};
export default Button;
