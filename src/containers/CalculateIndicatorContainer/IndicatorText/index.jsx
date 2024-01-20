import { BUTTON_TYPES } from "../../../constants";
import useCalculation from "../../../stores/calculation";

const calculationItemsPlaceHolder = {
  type: BUTTON_TYPES.NUMBER,
  value: "0",
};

const IndicatorText = () => {
  const { calculationItems } = useCalculation();

  const hasCalculationItems = calculationItems.length > 0;

  const generateCalculationItemsText = (calculationItems) => {
    return calculationItems
      .map((item) => {
        const isBrackets = item.type === BUTTON_TYPES.BRACKETS;

        return isBrackets
          ? generateBracketsText(item.properties.children)
          : item.value;
      })
      .join("");
  };

  const generateBracketsText = (bracketsChildren) => {
    return `(${generateCalculationItemsText(bracketsChildren)})`;
  };

  const calculationItemsText = (
    hasCalculationItems ? [...calculationItems] : [calculationItemsPlaceHolder]
  )
    .map((item) => {
      const isBrackets = item.type === BUTTON_TYPES.BRACKETS;

      return isBrackets
        ? generateBracketsText(item.properties.children)
        : item.value;
    })
    .join("");

  return (
    <div className="text-white flex justify-end cursor-default">
      <div className="font-bold text-xl">{calculationItemsText}</div>
    </div>
  );
};

export default IndicatorText;
