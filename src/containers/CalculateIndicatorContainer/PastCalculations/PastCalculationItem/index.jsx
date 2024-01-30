import classNames from "classnames";
import withPastCalculationItemLogic, {
  PAST_CALCULATION_ITEM_TYPES,
} from "./withPastCalculationItemLogic";
import parse from "html-react-parser";

const pastCalculationItemStyles =
  "border px-2 py-1 rounded-md mr-3 border-blue-500 cursor-pointer hover:bg-zinc-600 hover:border-blue-400 overflow-ellipsis whitespace-nowrap overflow-hidden";

const PastCalculationItem = withPastCalculationItemLogic((props) => {
  const {
    calculationItemsText,
    calculatedItemText,
    isErrorCalculatedItem,
    handleClickCalculationItems,
  } = props;

  const calculatedItemTextClassName = classNames(
    pastCalculationItemStyles,
    "max-w-[30%]",
    {
      "pointer-events-none bg-zinc-600 border-zinc-600 text-zinc-500":
        isErrorCalculatedItem,
    }
  );
  const calculationItemsTextClassName = classNames(
    pastCalculationItemStyles,
    "max-w-[70%]"
  );

  const parsedCalculationItemsText = parse(calculationItemsText);
  const parsedCalculatedItemText = parse(calculatedItemText);

  return (
    <div className="text-sm flex items-center select-none mb-3 [&:last-child]:mb-0">
      <div
        onClick={handleClickCalculationItems(
          PAST_CALCULATION_ITEM_TYPES.CALCULATION_ITEMS
        )}
        title={parsedCalculationItemsText}
        className={calculationItemsTextClassName}
      >
        {parsedCalculationItemsText}
      </div>
      <div className="mr-3">=</div>
      <div
        onClick={handleClickCalculationItems(
          PAST_CALCULATION_ITEM_TYPES.CALCULATED_ITEM
        )}
        title={parsedCalculatedItemText}
        className={calculatedItemTextClassName}
      >
        {parsedCalculatedItemText}
      </div>
    </div>
  );
});

export default PastCalculationItem;
