import { CALCULATION_ITEM_TYPES } from "../../constants";

const generateBracketsParentPropertiesChildrenPath = (bracketsItemIndex) =>
  `properties.children[${bracketsItemIndex}]`;
const generateBracketsCurrentPath = (bracketsItemIndex) =>
  `[${bracketsItemIndex}]`;

const findScopeBracketsPath = (payload) => {
  const {
    calculationItems,
    isInnerParentBracket = false,
    bracketsItemPathItems,
    onlyOpenedBrackets = true,
  } = payload;

  const bracketsItemIndex = calculationItems.findIndex((item) => {
    const isBrackets = item.type === CALCULATION_ITEM_TYPES.BRACKETS;
    const isValidForOpenStatus = onlyOpenedBrackets
      ? item?.properties?.isOpen === true
      : true;

    return isBrackets && isValidForOpenStatus;
  });
  if (bracketsItemIndex === -1) return;

  const bracketsItem = calculationItems[bracketsItemIndex];

  if (isInnerParentBracket) {
    bracketsItemPathItems.push(
      generateBracketsParentPropertiesChildrenPath(bracketsItemIndex)
    );
  } else {
    bracketsItemPathItems.push(generateBracketsCurrentPath(bracketsItemIndex));
  }

  findScopeBracketsPath({
    calculationItems: bracketsItem.properties.children,
    isInnerParentBracket: true,
    bracketsItemPathItems,
    onlyOpenedBrackets,
  });
};

export const findBracketsPath = (calculationItems, customConfig = {}) => {
  const { onlyOpenedBrackets } = customConfig;

  const bracketsItemPathItems = [];
  findScopeBracketsPath({
    calculationItems,
    bracketsItemPathItems,
    onlyOpenedBrackets,
  });

  return bracketsItemPathItems.length === 0
    ? null
    : bracketsItemPathItems.join(".");
};
