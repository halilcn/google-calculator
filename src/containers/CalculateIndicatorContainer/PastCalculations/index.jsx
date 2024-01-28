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
        <div className="absolute w-52 bg-zinc-700 px-2 -top-3 flex flex-col rounded-md right-full mr-12">
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
  );
});

export default PastCalculations;
