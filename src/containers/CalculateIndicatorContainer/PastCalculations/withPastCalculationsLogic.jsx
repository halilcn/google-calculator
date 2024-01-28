import { useState } from "react";
import useCalculation from "../../../stores/calculation";

const withPastCalculationsLogic = (ContainerComponent) => (props) => {
  const { pastCalculations } = useCalculation();

  const [isEnabledDropdown, setIsEnabledDropdown] = useState(false);

  const toggleDropdown = () => setIsEnabledDropdown((prev) => !prev);

  return (
    <ContainerComponent
      {...props}
      toggleDropdown={toggleDropdown}
      isEnabledDropdown={isEnabledDropdown}
      pastCalculations={pastCalculations}
    />
  );
};

export default withPastCalculationsLogic;
