import _ from "lodash";

const testVal = [
  {
    value: "789",
    type: "NUMBER",
  },
  {
    type: "BRACKETS",
    properties: {
      isOpen: true,
      children: [
        {
          value: "789",
          type: "NUMBER",
        },
        {
          value: "+",
          type: "ADDITION",
        },
        {
          type: "BRACKETS",
          properties: {
            isOpen: true,
            children: [
              {
                value: "789",
                type: "NUMBER",
              },
            ],
          },
        },
      ],
    },
  },
  {
    type: "BRACKETS",
    properties: {
      isOpen: true,
      children: [
        {
          value: "789",
          type: "NUMBER",
        },
        {
          value: "+",
          type: "ADDITION",
        },
        {
          type: "BRACKETS",
          properties: {
            isOpen: true,
            children: [
              {
                value: "789",
                type: "NUMBER",
              },
            ],
          },
        },
      ],
    },
  },
];

const findCurrentPath = (payload) => {
  const { calculationItems, isInnerBracket = false, res } = payload;

  const bracketItemIndex = calculationItems.findIndex(
    (item) => item.type === "BRACKETS" && item.properties.isOpen === true
  );
  if (bracketItemIndex === -1) return;

  const bracketItem = calculationItems[bracketItemIndex];

  if (isInnerBracket) {
    res.push(`properties.children[${bracketItemIndex}]`);
  } else {
    res.push(`[${bracketItemIndex}]`);
  }

  findCurrentPath({
    calculationItems: bracketItem.properties.children,
    isInnerBracket: true,
    res,
  });
};

export const findBracketsPath = (calculationItems) => {
  const res = [];
  findCurrentPath({ calculationItems, res });

  if (res.length === 0) return null;

  return res.join(".");
};
