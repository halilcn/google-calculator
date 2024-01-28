import {
  CALCULATION_ITEM_TEXTS,
  CALCULATION_ITEM_TYPES,
} from "../../../constants";
import useCalculation from "../../../stores/calculation";
import withGenerateCalculationItemsText from "../common/withGenerateCalculationItemsText";

const calculationItemsPlaceHolder = {
  type: CALCULATION_ITEM_TYPES.NUMBER,
  value: CALCULATION_ITEM_TEXTS.ZERO,
};

const withIndicatorTextLogic = (ContainerComponent) => (props) => {
  const { calculationItems, hasError } = useCalculation();

  const hasCalculationItems = calculationItems.length > 0;

  const _calculationItems = hasCalculationItems
    ? [...calculationItems]
    : [calculationItemsPlaceHolder];

  const WrappedGenerateCalculationItemsText = withGenerateCalculationItemsText(
    (props) => {
      const { calculationItemsText, ...restOfProps } = props;

      const _calculationItemsText = hasError ? "Error" : calculationItemsText;

      return (
        <ContainerComponent
          {...restOfProps}
          calculationItemsText={_calculationItemsText}
        />
      );
    }
  );

  return (
    <WrappedGenerateCalculationItemsText
      {...props}
      calculationItems={_calculationItems}
    />
  );
};

export default withIndicatorTextLogic;
