import classNames from "classnames";

const ActionButton = (props) => {
  const { text, className, ...restOfProps } = props;

  const itemClassName = classNames(
    "w-1/4 h-9 text-white flex items-center justify-center cursor-pointer rounded-md select-none font-medium",
    className
  );

  return (
    <div className={itemClassName} {...restOfProps}>
      {text}
    </div>
  );
};

export default ActionButton;
