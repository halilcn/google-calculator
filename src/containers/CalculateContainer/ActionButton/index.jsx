import classNames from "classnames";

const ActionButton = (props) => {
  const { calculationItem, className, handleOnClick: _handleOnClick } = props;

  const itemClassName = classNames(
    "w-1/4 h-9 text-white flex items-center justify-center cursor-pointer rounded-md select-none font-medium",
    className
  );

  const handleOnClick = () => {
    _handleOnClick(calculationItem);
  };

  return (
    <div className={itemClassName} onClick={handleOnClick}>
      {calculationItem.text}
    </div>
  );
};

export default ActionButton;
