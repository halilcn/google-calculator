import classNames from "classnames";
import ActionButton from "./ActionButton";
import { BUTTON_TYPES } from "../../constants";
import useCalculation from "../../stores/calculation";
import _ from "lodash";
import { useState } from "react";
import { findBracketsPath } from "./utils";

const outButtonStyle = "bg-zinc-500 hover:bg-zinc-400";
const innerButtonStyle = "bg-zinc-700 hover:bg-zinc-600";

const MAX_ITEMS_LENGTH = 3;

// TODO: state ile logic'i birbirinden ayır

// ['[1]]
// ['[1].properties.children[1]]
// ['[1].properties.children[1].properties.children[1]]

const CalculateContainer = () => {
  const { addCalculationItem, calculationItems, setCalculationItems } =
    useCalculation();

  console.log("calculationItems", calculationItems);
  const currentBracketsPath = findBracketsPath(calculationItems);
  const isInsideInBracket = currentBracketsPath !== null;
  const currentBracketsItem =
    isInsideInBracket && _.get(calculationItems, currentBracketsPath);

  const lastCalculationItem = isInsideInBracket
    ? currentBracketsItem.properties.children[
        currentBracketsItem.properties.children.length - 1
      ]
    : calculationItems[calculationItems.length - 1];
  const hasCalculationItems = calculationItems.length > 0;

  console.log("calculationItems", calculationItems);
  console.log("lastCalculationItem", lastCalculationItem);
  console.log("currentBracketsPath", currentBracketsPath);

  const getNewBracketsItemForAdding = (item) => ({
    ...currentBracketsItem,
    properties: {
      ...currentBracketsItem.properties,
      children: [...currentBracketsItem.properties.children, item],
    },
  });
  const getNewBracketsItemForUpdatingLastItem = (item) => ({
    ...currentBracketsItem,
    properties: {
      ...currentBracketsItem.properties,
      children: [
        ...currentBracketsItem.properties.children.slice(
          0,
          currentBracketsItem.properties.children.length - 1
        ),
        item,
      ],
    },
  });
  const getBracketsItemAfterDeletingLastItem = () => ({
    ...currentBracketsItem,
    properties: {
      ...currentBracketsItem.properties,
      children: [
        ...currentBracketsItem.properties.children.slice(
          0,
          currentBracketsItem.properties.children.length - 1
        ),
      ],
    },
  });

  const updateBracketsCalculationItem = (newBracketsCalculationItem) => {
    const _calculationItems = JSON.parse(JSON.stringify(calculationItems));
    _.set(_calculationItems, currentBracketsPath, newBracketsCalculationItem);
    setCalculationItems(_calculationItems);
  };

  const handleAddNewCalculationItem = (item) => {
    if (isInsideInBracket) {
      const newBracketsCalculationItem = getNewBracketsItemForAdding(item);
      updateBracketsCalculationItem(newBracketsCalculationItem);
      return;
    }

    addCalculationItem(item);
  };

  const handleDeleteLastCalculationItem = () => {
    if (isInsideInBracket) {
      const hasChildrenItems =
        currentBracketsItem.properties.children.length !== 0;

      if (!hasChildrenItems) {
        const test = [...calculationItems];
        _.unset(test, currentBracketsPath);

        // TODO: it is not good way to solve
        setCalculationItems(
          JSON.parse(JSON.stringify(test).replace(",null", ""))
        );

        return;
      }

      const newBracketsCalculationItem = getBracketsItemAfterDeletingLastItem();
      updateBracketsCalculationItem(
        hasChildrenItems ? newBracketsCalculationItem : null
      );
      return;
    }

    const newCalculationItems = [
      ...calculationItems.slice(0, calculationItems.length - 1),
    ];
    setCalculationItems(newCalculationItems);
  };

  const handleUpdateLastCalculationItem = (updatedCalculationItem) => {
    if (isInsideInBracket) {
      const newBracketsCalculationItem = getNewBracketsItemForUpdatingLastItem(
        updatedCalculationItem
      );
      updateBracketsCalculationItem(newBracketsCalculationItem);
      return;
    }

    setCalculationItems([
      ...calculationItems.slice(0, calculationItems.length - 1),
      updatedCalculationItem,
    ]);
  };

  /// TODO: create validate method
  const handleClickNumberButton = (numberText) => {
    const isZeroAsFirstNumber = !hasCalculationItems && numberText === "0";
    if (isZeroAsFirstNumber) return;

    const hasAlreadyCircleCharacter =
      numberText === "." &&
      lastCalculationItem?.type === BUTTON_TYPES.NUMBER &&
      lastCalculationItem?.value?.includes(".");
    if (hasAlreadyCircleCharacter) return;

    if (lastCalculationItem?.type === BUTTON_TYPES.NUMBER) {
      const newCalculationItem = {
        ...lastCalculationItem,
        value: `${lastCalculationItem.value}${numberText}`,
      };

      if (isInsideInBracket) {
        updateBracketsCalculationItem(
          getNewBracketsItemForUpdatingLastItem(newCalculationItem)
        );
        return;
      }

      const _calculationItems = [
        ...calculationItems.slice(0, calculationItems.length - 1),
        newCalculationItem,
      ];
      setCalculationItems(_calculationItems);

      return;
    }

    handleAddNewCalculationItem({
      value: numberText,
      type: BUTTON_TYPES.NUMBER,
    });
  };

  const handleClickCEButton = () => {
    if (!hasCalculationItems) return;

    switch (lastCalculationItem?.type) {
      case BUTTON_TYPES.NUMBER: {
        const hasOnlyOneCharacter = lastCalculationItem.value.length === 1;

        if (hasOnlyOneCharacter) {
          handleDeleteLastCalculationItem();
          return;
        }

        const updatedCalculationItem = {
          ...lastCalculationItem,
          value: lastCalculationItem.value.slice(
            0,
            lastCalculationItem.value.length - 1
          ),
        };
        handleUpdateLastCalculationItem(updatedCalculationItem);

        return;
      }
      default:
        handleDeleteLastCalculationItem();
    }
  };

  const handleOpenBrackets = () => {
    const newItem = {
      value: "()",
      type: BUTTON_TYPES.BRACKETS,
      properties: {
        children: [],
        isOpen: true,
      },
    };

    handleAddNewCalculationItem(newItem);
  };

  const handleCloseBrackets = () => {
    if (!isInsideInBracket) return;

    const updatedBracketsItem = {
      ...currentBracketsItem,
      properties: {
        ...currentBracketsItem.properties,
        isOpen: false,
      },
    };
    updateBracketsCalculationItem(updatedBracketsItem);
  };

  const handleOtherActionsButton = (item) => {
    const { type, text } = item;

    const isAvailable =
      lastCalculationItem?.type === BUTTON_TYPES.NUMBER ||
      lastCalculationItem?.type === BUTTON_TYPES.BRACKETS;
    if (!isAvailable) return;

    const newCalculationItem = {
      type,
      value: text,
    };
    handleAddNewCalculationItem(newCalculationItem);
  };

  const handleActionButtonClick = (item) => {
    const { type, text } = item;

    switch (type) {
      case BUTTON_TYPES.NUMBER:
        handleClickNumberButton(text);
        return;
      case BUTTON_TYPES.CE:
        handleClickCEButton();
        return;
      case BUTTON_TYPES.OPEN_BRACKETS:
        handleOpenBrackets();
        return;
      case BUTTON_TYPES.CLOSE_BRACKETS:
        handleCloseBrackets();
        return;
      default:
        handleOtherActionsButton({ type, text });
    }
  };

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
    const { className } = item;
    const isLastItem = itemKey === MAX_ITEMS_LENGTH;

    const key = `${rowIndex}-${itemKey}`;
    const itemClassName = classNames(className, {
      "mr-4": !isLastItem,
    });

    return (
      <ActionButton
        {...item}
        key={key}
        className={itemClassName}
        handleOnClick={handleActionButtonClick}
      />
    );
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
