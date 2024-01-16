import IndicatorText from "./IndicatorText";
import PastCalculations from "./PastCalculations";

const CalculateIndicatorContainer = () => {
  return (
    <div>
      <div className="border p-3 border-zinc-700 rounded-md hover:bg-zinc-700">
        <PastCalculations />
        <IndicatorText />
      </div>
    </div>
  );
};

export default CalculateIndicatorContainer;
