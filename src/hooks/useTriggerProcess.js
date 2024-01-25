import { useRef } from "react";

const useTriggerProcess = (processFn, time) => {
  const processTimeout = useRef(null);

  const triggerProcess = () => {
    processTimeout.current = setTimeout(() => {
      processFn();
      processTimeout.current = null;
    }, time);
  };

  const abortProcess = () => {
    if (!processTimeout.current) return;
    clearTimeout(processTimeout.current);
    processTimeout.current = null;
  };

  return {
    triggerProcess,
    abortProcess,
  };
};

export default useTriggerProcess;
