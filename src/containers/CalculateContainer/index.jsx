import classNames from "classnames";
import ActionButton from "./ActionButton";
import { BUTTON_TYPES } from "../../constants";

const outButtonStyle = "bg-zinc-500 hover:bg-zinc-400";
const innerButtonStyle = "bg-zinc-700 hover:bg-zinc-600";

const MAX_ITEMS_LENGTH = 3;

const CalculateContainer = () => {
  const allActionButtons = [
    [
      {
        text: "(",
        type: BUTTON_TYPES.OPEN_BRACKETS,
        className: outButtonStyle,
      },
      {
        text: ")",
        type: BUTTON_TYPES.CLOSE_BRACKETS,
        className: outButtonStyle,
      },
      {
        text: "%",
        type: BUTTON_TYPES.PERCENTAGE,
        className: outButtonStyle,
      },
      {
        text: "CE",
        type: BUTTON_TYPES.CE,
        className: outButtonStyle,
      },
    ],
    [
      {
        text: "7",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "8",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "9",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "÷",
        type: BUTTON_TYPES.DIVISION,
        className: outButtonStyle,
      },
    ],
    [
      {
        text: "4",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "5",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "6",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "x",
        type: BUTTON_TYPES.MULTIPLICATION,
        className: outButtonStyle,
      },
    ],
    [
      {
        text: "1",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "2",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "3",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "-",
        type: BUTTON_TYPES.REMOVE,
        className: outButtonStyle,
      },
    ],
    [
      {
        text: "0",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: ".",
        type: BUTTON_TYPES.NUMBER,
        className: innerButtonStyle,
      },
      {
        text: "=",
        type: BUTTON_TYPES.CALCULATE,
        className: "bg-blue-400	hover:bg-blue-300 text-black",
      },
      {
        text: "+",
        type: BUTTON_TYPES.ADDITION,
        className: outButtonStyle,
      },
    ],
  ];

  const renderItem = (rowIndex) => (item, itemKey) => {
    const { className, ...restOfItem } = item;
    const isLastItem = itemKey === MAX_ITEMS_LENGTH;

    const key = `${rowIndex}-${itemKey}`;
    const itemClassName = classNames(className, {
      "mr-4": !isLastItem,
    });

    return <ActionButton key={key} className={itemClassName} {...restOfItem} />;
  };

  return (
    <div className="flex flex-col">
      {allActionButtons.map((rowItems, rowIndex) => (
        <div className="flex mt-4" key={rowIndex}>
          {rowItems.map(renderItem(rowIndex))}
        </div>
      ))}
    </div>
  );
};

export default CalculateContainer;
