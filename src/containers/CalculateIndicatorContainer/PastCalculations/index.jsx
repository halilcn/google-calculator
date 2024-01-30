import { FaRegClock } from "react-icons/fa";
import PastCalculationItem from "./PastCalculationItem";
import withPastCalculationsLogic from "./withPastCalculationsLogic";

const PastCalculations = withPastCalculationsLogic((props) => {
  const { toggleDropdown, isEnabledDropdown, pastCalculations } = props;

  return (
    <div className="text-white relative font-bold">
      <FaRegClock
        onClick={toggleDropdown}
        className="cursor-pointer text-white hover:text-zinc-300"
        size={18}
      />
      {isEnabledDropdown && (
        <div className="absolute w-80 max-h-96 bg-zinc-700 -top-3 flex flex-col rounded-md right-full mr-12 overflow-scroll">
          {pastCalculations.length === 0 ? (
            <div className="p-3 text-sm font-normal text-zinc-400 text-center">
              Your calculations and results are displayed here for you to reuse.
            </div>
          ) : (
            <div className="px-4 py-4">
              {pastCalculations.map((pastCalculation, key) => (
                <PastCalculationItem
                  pastCalculation={pastCalculation}
                  toggleDropdown={toggleDropdown}
                  key={key}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default PastCalculations;
