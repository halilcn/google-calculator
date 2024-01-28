import classNames from "classnames";
import withPastCalculationItemLogic, {
  PAST_CALCULATION_ITEM_TYPES,
} from "./withPastCalculationItemLogic";

const PastCalculationItem = withPastCalculationItemLogic((props) => {
  const {
    calculationItemsText,
    calculatedItemText,
    isErrorCalculatedItem,
    handleClickCalculationItems,
  } = props;

  const calculatedItemTextClassName = classNames(
    "border px-2 py-1 rounded-md mr-3 border-blue-500 cursor-pointer hover:bg-zinc-600 hover:border-blue-400",
    {
      "pointer-events-none bg-zinc-600 border-zinc-600 text-zinc-500":
        isErrorCalculatedItem,
    }
  );
  return (
    <div className="text-sm flex items-center select-none my-2">
      <div
        onClick={handleClickCalculationItems(
          PAST_CALCULATION_ITEM_TYPES.CALCULATION_ITEMS
        )}
        className="border px-2 py-1 rounded-md mr-3 border-blue-500 cursor-pointer hover:bg-zinc-600 hover:border-blue-400"
        dangerouslySetInnerHTML={{ __html: calculationItemsText }}
      />
      <div className="mr-3">=</div>
      <div
        onClick={handleClickCalculationItems(
          PAST_CALCULATION_ITEM_TYPES.CALCULATED_ITEM
        )}
        className={calculatedItemTextClassName}
        dangerouslySetInnerHTML={{ __html: calculatedItemText }}
      />
    </div>
  );
});

export default PastCalculationItem;
