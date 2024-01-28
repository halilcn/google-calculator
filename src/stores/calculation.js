import { isArray, isEmpty } from "lodash";
import { create } from "zustand";

const useCalculation = create((set) => ({
  calculationItems: [],
  pastCalculations: [],
  hasError: false,
  setCalculationItems: (calculationItems = []) =>
    set(() => ({ calculationItems })),
  addPastCalculation: (pastCalculation, calculatedItem) =>
    set((state) => ({
      pastCalculations: [
        ...state.pastCalculations,
        {
          calculationItems: pastCalculation,
          calculatedItem,
        },
      ],
    })),
  addCalculationItem: (calculationItem) => {
    if (isEmpty(calculationItem) || isArray(calculationItem)) return;

    set((state) => ({
      calculationItems: [...state.calculationItems, calculationItem],
    }));
  },
  setHasError: (payload) => set(() => ({ hasError: payload })),
}));

export default useCalculation;
