import classNames from "classnames";

const ActionButton = (props) => {
  const { text, className, handleOnClick: _handleOnClick, type } = props;

  const itemClassName = classNames(
    "w-1/4 h-9 text-white flex items-center justify-center cursor-pointer rounded-md select-none font-medium",
    className
  );

  const handleOnClick = () => {
    _handleOnClick({
      text,
      type,
    });
  };

  return (
    <div className={itemClassName} onClick={handleOnClick}>
      {text}
    </div>
  );
};

export default ActionButton;
