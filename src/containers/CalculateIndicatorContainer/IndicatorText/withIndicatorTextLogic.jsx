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
  const { calculationItems } = useCalculation();

  const hasCalculationItems = calculationItems.length > 0;

  const mapCalculationItem = (item) => {
    const isBrackets = item.type === CALCULATION_ITEM_TYPES.BRACKETS;

    return isBrackets
      ? generateBracketsText(item.properties.children)
      : item.value;
  };

  const generateCalculationItemsText = (calculationItems) =>
    calculationItems.map(mapCalculationItem).join(" ");

  const generateBracketsText = (bracketsChildren) =>
    `(${generateCalculationItemsText(bracketsChildren)})`;

  const calculationItemsText = (
    hasCalculationItems ? [...calculationItems] : [calculationItemsPlaceHolder]
  )
    .map(mapCalculationItem)
    .join(" ");

  return (
    <ContainerComponent
      {...props}
      calculationItemsText={calculationItemsText}
    />
  );
};

export default withIndicatorTextLogic;