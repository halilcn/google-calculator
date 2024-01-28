import { CALCULATION_ITEM_TYPES } from "../../../constants";

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

const withGenerateCalculationItemsText = (ContainerComponent) => (props) => {
  const { calculationItems } = props;

  const calculationItemsText = calculationItems
    .map(mapCalculationItem)
    .join(" ");

  return (
    <ContainerComponent
      {...props}
      calculationItemsText={calculationItemsText}
    />
  );
};

export default withGenerateCalculationItemsText;
