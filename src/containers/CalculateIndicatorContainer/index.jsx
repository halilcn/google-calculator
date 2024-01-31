import classNames from "classnames";
import IndicatorText from "./IndicatorText";
import PastCalculations from "./PastCalculations";
import useCalculation from "../../stores/calculation";

const CalculateIndicatorContainer = () => {
  const { isFocusedOnIndicator } = useCalculation();

  return (
    <div>
      <div
        className={classNames("border p-3 border-zinc-700 rounded-md", {
          "!border-blue-400": isFocusedOnIndicator,
        })}
      >
        <PastCalculations />
        <IndicatorText />
      </div>
    </div>
  );
};

export default CalculateIndicatorContainer;
