import classNames from "classnames";

const ActionButton = (props) => {
  const { calculationItem, className, handleOnClick: _handleOnClick } = props;
  const { actionButtonProps = {} } = calculationItem;

  const itemClassName = classNames(
    "w-1/4 h-9 text-white flex items-center justify-center cursor-pointer rounded-md select-none font-medium",
    className
  );

  const handleOnClick = () => {
    _handleOnClick(calculationItem);
  };

  return (
    <button
      {...actionButtonProps}
      className={itemClassName}
      onClick={handleOnClick}
    >
      {calculationItem.text}
    </button>
  );
};

export default ActionButton;
