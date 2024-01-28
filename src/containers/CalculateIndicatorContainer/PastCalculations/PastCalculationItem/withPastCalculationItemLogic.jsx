import withGenerateCalculationItemsText from "../../common/withGenerateCalculationItemsText";
import useCalculation from "../../../../stores/calculation.js";

export const PAST_CALCULATION_ITEM_TYPES = {
  CALCULATION_ITEMS: "CALCULATION_ITEMS",
  CALCULATED_ITEM: "CALCULATED_ITEM",
};

const withPastCalculationItemLogic = (ContainerComponent) => (props) => {
  const { pastCalculation, toggleDropdown } = props;

  const { setCalculationItems, setHasError } = useCalculation();

  const { calculationItems, calculatedItem } = pastCalculation;
  const isErrorCalculatedItem = !calculatedItem;

  // We are sure that the outcome will be a number
  const calculatedItemText = isErrorCalculatedItem
    ? "Error"
    : String(calculatedItem.value);

  const getCalculationItemsByType = (type) =>
    ({
      [PAST_CALCULATION_ITEM_TYPES.CALCULATED_ITEM]: [
        pastCalculation.calculatedItem,
      ],
      [PAST_CALCULATION_ITEM_TYPES.CALCULATION_ITEMS]:
        pastCalculation.calculationItems,
    }[type]);
  const handleClickCalculationItems = (type) => () => {
    setCalculationItems(getCalculationItemsByType(type));
    toggleDropdown();
    setHasError(false);
  };

  const WrappedGenerateCalculationItemsText =
    withGenerateCalculationItemsText(ContainerComponent);

  return (
    <WrappedGenerateCalculationItemsText
      calculationItems={calculationItems}
      hasError={false}
      calculatedItemText={calculatedItemText}
      isErrorCalculatedItem={isErrorCalculatedItem}
      handleClickCalculationItems={handleClickCalculationItems}
    />
  );
};

export default withPastCalculationItemLogic;
