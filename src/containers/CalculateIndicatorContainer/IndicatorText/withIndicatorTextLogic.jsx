import {
  CALCULATION_ITEM_TEXTS,
  CALCULATION_ITEM_TYPES,
} from "../../../constants";
import useCalculation from "../../../stores/calculation";

const calculationItemsPlaceHolder = {
  type: CALCULATION_ITEM_TYPES.NUMBER,
  value: CALCULATION_ITEM_TEXTS.ZERO,
};

const withIndicatorTextLogic = (ContainerComponent) => (props) => {
  const { calculationItems, hasError } = useCalculation();

  const hasCalculationItems = calculationItems.length > 0;

  const mapCalculationItem = (item) => {
    const isBrackets = item.type === CALCULATION_ITEM_TYPES.BRACKETS;

    return isBrackets ? generateBracketsText(item) : item.value;
  };

  const generateCalculationItemsText = (calculationItems) =>
    calculationItems.map(mapCalculationItem).join(" ");

  const generateBracketsText = (item) => {
    const { isOpen, children } = item.properties;

    return `<span>(</span>${generateCalculationItemsText(
      children
    )}<span style="color:${isOpen ? "#b3b3b3" : "white"};">)</span>`;
  };

  const calculationItemsText = (
    hasCalculationItems ? [...calculationItems] : [calculationItemsPlaceHolder]
  )
    .map(mapCalculationItem)
    .join(" ");

  const indicatorText = hasError ? "Error" : calculationItemsText;

  return (
    <ContainerComponent
      {...props}
      indicatorText={indicatorText}
      hasError={hasError}
    />
  );
};

export default withIndicatorTextLogic;
