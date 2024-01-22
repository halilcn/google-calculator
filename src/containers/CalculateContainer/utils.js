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
  } = payload;

  const bracketsItemIndex = calculationItems.findIndex(
    (item) =>
      item.type === CALCULATION_ITEM_TYPES.BRACKETS &&
      item.properties.isOpen === true
  );
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
  });
};

export const findBracketsPath = (calculationItems) => {
  const bracketsItemPathItems = [];
  findScopeBracketsPath({ calculationItems, bracketsItemPathItems });

  return bracketsItemPathItems.length === 0
    ? null
    : bracketsItemPathItems.join(".");
};
