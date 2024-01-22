import _ from "lodash";
import useCalculation from "../../stores/calculation";
import { findBracketsPath } from "./utils";
import {
  CALCULATION_ITEM_CUSTOM_ACTIONS,
  CALCULATION_ITEM_TEXTS,
  CALCULATION_ITEM_TYPES,
} from "../../constants";
import classNames from "classnames";
import ActionButton from "./ActionButton";

const outButtonStyle = "bg-zinc-500 hover:bg-zinc-400";
const innerButtonStyle = "bg-zinc-700 hover:bg-zinc-600";
const calculateButtonStyle = "bg-blue-400 hover:bg-blue-300 text-black";

const MAX_ROW_ITEMS_LENGTH = 3;

// TODO: create collection item? her bir type item için?

const withCalculationContainerLogic = (ContainerComponent) => (props) => {
  const { addCalculationItem, calculationItems, setCalculationItems } =
    useCalculation();

  const currentBracketsItemPath = findBracketsPath(calculationItems);
  const isInsideInBrackets = currentBracketsItemPath !== null;

  const currentBracketsItem =
    isInsideInBrackets && _.get(calculationItems, currentBracketsItemPath);
  const currentBracketsItemChildren =
    currentBracketsItem && currentBracketsItem.properties.children;

  const lastCalculationItemOnScope = isInsideInBrackets
    ? currentBracketsItemChildren[currentBracketsItemChildren.length - 1]
    : calculationItems[calculationItems.length - 1];

  const hasCalculationItems = calculationItems.length > 0;

  const getNewBracketsItemForAdding = (item) => ({
    ...currentBracketsItem,
    properties: {
      ...currentBracketsItem.properties,
      children: [...currentBracketsItemChildren, item],
    },
  });
  const getNewBracketsItemForUpdatingLastCalculationItem = (item) => ({
    ...currentBracketsItem,
    properties: {
      ...currentBracketsItem.properties,
      children: [
        ...currentBracketsItemChildren.slice(
          0,
          currentBracketsItemChildren.length - 1
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

  const updateBracketsItem = (newBracketsItem) => {
    const _calculationItems = JSON.parse(JSON.stringify(calculationItems));
    _.set(_calculationItems, currentBracketsItemPath, newBracketsItem);
    setCalculationItems(_calculationItems);
  };

  const handleAddNewCalculationItemOnScope = (item) => {
    if (isInsideInBrackets) {
      const newBracketsItem = getNewBracketsItemForAdding(item);
      updateBracketsItem(newBracketsItem);
      return;
    }

    addCalculationItem(item);
  };
  // TODO: refactor
  const handleDeleteLastCalculationItemOnScope = () => {
    if (isInsideInBrackets) {
      const hasChildrenItems =
        currentBracketsItem.properties.children.length !== 0;

      if (!hasChildrenItems) {
        const test = [...calculationItems];
        _.unset(test, currentBracketsItemPath);

        // TODO: it is not good way to solve
        setCalculationItems(
          JSON.parse(JSON.stringify(test).replace(",null", ""))
        );

        return;
      }

      const newBracketsCalculationItem = getBracketsItemAfterDeletingLastItem();
      updateBracketsItem(hasChildrenItems ? newBracketsCalculationItem : null);
      return;
    }

    const newCalculationItems = [
      ...calculationItems.slice(0, calculationItems.length - 1),
    ];
    setCalculationItems(newCalculationItems);
  };
  const handleUpdateLastCalculationItem = (updatedCalculationItem) => {
    if (isInsideInBrackets) {
      const newBracketsItem = getNewBracketsItemForUpdatingLastCalculationItem(
        updatedCalculationItem
      );
      updateBracketsItem(newBracketsItem);
      return;
    }

    setCalculationItems([
      ...calculationItems.slice(0, calculationItems.length - 1),
      updatedCalculationItem,
    ]);
  };

  const validateHandleClickNumberButton = (numberText) => {
    const isZeroNumberAsFirstCalculationItem =
      lastCalculationItemOnScope?.type !== CALCULATION_ITEM_TYPES.NUMBER &&
      numberText === CALCULATION_ITEM_TEXTS.ZERO;
    const hasAlreadyCircleCharacter =
      numberText === CALCULATION_ITEM_TEXTS.POINT &&
      lastCalculationItemOnScope?.type === CALCULATION_ITEM_TYPES.NUMBER &&
      lastCalculationItemOnScope?.value?.includes(CALCULATION_ITEM_TEXTS.POINT);

    return !(isZeroNumberAsFirstCalculationItem || hasAlreadyCircleCharacter);
  };
  const handleClickNumberButton = (item) => {
    const { type, text } = item;

    if (!validateHandleClickNumberButton(text)) return;

    if (lastCalculationItemOnScope?.type === CALCULATION_ITEM_TYPES.NUMBER) {
      const newCalculationItem = {
        ...lastCalculationItemOnScope,
        value: `${lastCalculationItemOnScope.value}${text}`,
      };
      handleUpdateLastCalculationItem(newCalculationItem);

      return;
    }

    handleAddNewCalculationItemOnScope({
      type,
      value: text,
    });
  };

  const validateHandleClickCEButton = () => {
    return hasCalculationItems;
  };
  const handleClickCEButton = () => {
    if (!validateHandleClickCEButton()) return;

    switch (lastCalculationItemOnScope?.type) {
      case CALCULATION_ITEM_TYPES.NUMBER: {
        const lastCalculationItemValue = lastCalculationItemOnScope.value;
        const hasOnlyOneCharacter = lastCalculationItemValue.length === 1;

        if (hasOnlyOneCharacter) {
          handleDeleteLastCalculationItemOnScope();
          return;
        }

        const updatedCalculationItem = {
          ...lastCalculationItemOnScope,
          value: lastCalculationItemValue.slice(
            0,
            lastCalculationItemValue.length - 1
          ),
        };
        handleUpdateLastCalculationItem(updatedCalculationItem);

        return;
      }
      default:
        handleDeleteLastCalculationItemOnScope();
    }
  };

  const handleOpenBrackets = () => {
    const newBracketsItem = {
      type: CALCULATION_ITEM_TYPES.BRACKETS,
      properties: {
        children: [],
        isOpen: true,
      },
    };

    handleAddNewCalculationItemOnScope(newBracketsItem);
  };

  const validateHandleCloseBrackets = () => {
    return isInsideInBrackets;
  };
  const handleCloseBrackets = () => {
    if (!validateHandleCloseBrackets()) return;

    const updatedBracketsItem = {
      ...currentBracketsItem,
      properties: {
        ...currentBracketsItem.properties,
        isOpen: false,
      },
    };
    updateBracketsItem(updatedBracketsItem);
  };

  const validateHandleOtherActionsButton = () => {
    const isLastItemCorrectType =
      lastCalculationItemOnScope?.type === CALCULATION_ITEM_TYPES.NUMBER ||
      lastCalculationItemOnScope?.type === CALCULATION_ITEM_TYPES.BRACKETS;

    return isLastItemCorrectType;
  };
  const handleOtherActionsButton = (item) => {
    if (!validateHandleOtherActionsButton()) return;

    const { type, text } = item;
    const newCalculationItem = {
      type,
      value: text,
    };

    handleAddNewCalculationItemOnScope(newCalculationItem);
  };

  const handleActionButtonClick = (item) => {
    const { type, text, customActionType = "" } = item;

    switch (customActionType) {
      case CALCULATION_ITEM_CUSTOM_ACTIONS.NUMBER:
        handleClickNumberButton({
          type,
          text,
        });
        return;
      case CALCULATION_ITEM_CUSTOM_ACTIONS.CE:
        handleClickCEButton();
        return;
      case CALCULATION_ITEM_CUSTOM_ACTIONS.OPEN_BRACKETS:
        handleOpenBrackets();
        return;
      case CALCULATION_ITEM_CUSTOM_ACTIONS.CLOSE_BRACKETS:
        handleCloseBrackets();
        return;
      default:
        handleOtherActionsButton({ type, text });
    }
  };

  const allCalculationItems = [
    [
      ...[
        {
          text: CALCULATION_ITEM_TEXTS.OPEN_BRACKETS,
          customActionType: CALCULATION_ITEM_CUSTOM_ACTIONS.OPEN_BRACKETS,
        },
        {
          text: CALCULATION_ITEM_TEXTS.CLOSE_BRACKETS,
          customActionType: CALCULATION_ITEM_CUSTOM_ACTIONS.CLOSE_BRACKETS,
        },
      ].map((calculationItem) => ({
        ...calculationItem,
        type: CALCULATION_ITEM_TYPES.BRACKETS,
        className: outButtonStyle,
      })),
      {
        text: CALCULATION_ITEM_TEXTS.PERCENTAGE,
        type: CALCULATION_ITEM_TYPES.PERCENTAGE,
        className: outButtonStyle,
      },
      {
        text: CALCULATION_ITEM_TEXTS.CE,
        type: CALCULATION_ITEM_TYPES.CE,
        customActionType: CALCULATION_ITEM_CUSTOM_ACTIONS.CE,
        className: outButtonStyle,
      },
    ],
    [
      ...[
        { text: CALCULATION_ITEM_TEXTS.SEVEN },
        { text: CALCULATION_ITEM_TEXTS.EIGHT },
        { text: CALCULATION_ITEM_TEXTS.NINE },
      ].map((calculationItem) => ({
        ...calculationItem,
        type: CALCULATION_ITEM_TYPES.NUMBER,
        customActionType: CALCULATION_ITEM_CUSTOM_ACTIONS.NUMBER,
        className: innerButtonStyle,
      })),
      {
        text: CALCULATION_ITEM_TEXTS.DIVISION,
        type: CALCULATION_ITEM_TYPES.DIVISION,
        className: outButtonStyle,
      },
    ],
    [
      ...[
        { text: CALCULATION_ITEM_TEXTS.FOUR },
        { text: CALCULATION_ITEM_TEXTS.FIVE },
        { text: CALCULATION_ITEM_TEXTS.SIX },
      ].map((calculationItem) => ({
        ...calculationItem,
        type: CALCULATION_ITEM_TYPES.NUMBER,
        customActionType: CALCULATION_ITEM_CUSTOM_ACTIONS.NUMBER,
        className: innerButtonStyle,
      })),
      {
        text: CALCULATION_ITEM_TEXTS.MULTIPLICATION,
        type: CALCULATION_ITEM_TYPES.MULTIPLICATION,
        className: outButtonStyle,
      },
    ],
    [
      ...[
        {
          text: CALCULATION_ITEM_TEXTS.ONE,
        },
        {
          text: CALCULATION_ITEM_TEXTS.TWO,
        },
        {
          text: CALCULATION_ITEM_TEXTS.THREE,
        },
      ].map((calculationItem) => ({
        ...calculationItem,
        type: CALCULATION_ITEM_TYPES.NUMBER,
        customActionType: CALCULATION_ITEM_CUSTOM_ACTIONS.NUMBER,
        className: innerButtonStyle,
      })),
      {
        text: CALCULATION_ITEM_TEXTS.REMOVE,
        type: CALCULATION_ITEM_TYPES.REMOVE,
        className: outButtonStyle,
      },
    ],
    [
      ...[
        { text: CALCULATION_ITEM_TEXTS.ZERO },
        { text: CALCULATION_ITEM_TEXTS.POINT }, // TODO: point için custom action ekleme
      ].map((calculationItem) => ({
        ...calculationItem,
        customActionType: CALCULATION_ITEM_CUSTOM_ACTIONS.NUMBER,
        type: CALCULATION_ITEM_TYPES.NUMBER,
        className: innerButtonStyle,
      })),
      {
        text: CALCULATION_ITEM_TEXTS.CALCULATE,
        type: CALCULATION_ITEM_TYPES.CALCULATE,
        className: calculateButtonStyle,
      },
      {
        text: CALCULATION_ITEM_TEXTS.ADDITION,
        type: CALCULATION_ITEM_TYPES.ADDITION,
        className: outButtonStyle,
      },
    ],
  ];

  const renderCalculationItem = (rowIndex) => (item, itemKey) => {
    const { className } = item;
    const isLastItemOnRow = itemKey === MAX_ROW_ITEMS_LENGTH;

    const key = `${rowIndex}_${itemKey}`;
    const itemClassName = classNames(className, {
      "mr-4": !isLastItemOnRow,
    });

    return (
      <ActionButton
        calculationItem={item}
        key={key}
        className={itemClassName}
        handleOnClick={handleActionButtonClick}
      />
    );
  };

  return (
    <ContainerComponent
      {...props}
      allCalculationItems={allCalculationItems}
      renderCalculationItem={renderCalculationItem}
    />
  );
};

export default withCalculationContainerLogic;
