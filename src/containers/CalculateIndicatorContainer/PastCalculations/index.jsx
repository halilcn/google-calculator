import { useState } from "react";
import { FaRegClock } from "react-icons/fa";

const PastCalculations = () => {
  const [isEnabledDropdown, setIsEnabledDropdown] = useState(false);

  const toggleDropdown = () => setIsEnabledDropdown((prev) => !prev);

  return (
    <div className="text-white relative font-bold">
      <FaRegClock
        onClick={toggleDropdown}
        className="cursor-pointer text-white hover:text-zinc-300"
        size={18}
      />
      {isEnabledDropdown && (
        <div className="absolute w-52 bg-zinc-700 p-3 -top-3 flex flex-col rounded-md right-full mr-12">
          <div className="text-sm flex items-center select-none">
            <div className="border px-2 py-1 rounded-md mr-3 border-blue-500 cursor-pointer hover:bg-zinc-600 hover:border-blue-400">
              1 + 2 
            </div>
            <div className="mr-3">=</div>
            <div className="border px-2 py-1 rounded-md mr-3 border-blue-500 cursor-pointer hover:bg-zinc-600 hover:border-blue-400">
              6
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastCalculations;
