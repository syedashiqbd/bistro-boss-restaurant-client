const Button = ({ title, position }) => {
  return (
    <div className={position}>
      <button className="uppercase btn btn-outline border-0  border-b-4">
        {title}
      </button>
    </div>
  );
};
export default Button;
