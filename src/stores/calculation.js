import { isArray, isEmpty } from "lodash";
import { create } from "zustand";

const useCalculation = create((set) => ({
  calculationItems: [],
  setCalculationItems: (calculationItems = []) =>
    set(() => ({ calculationItems })),
  addCalculationItem: (calculationItem) => {
    if (isEmpty(calculationItem) || isArray(calculationItem)) return;

    set((state) => ({
      calculationItems: [...state.calculationItems, calculationItem],
    }));
  },
}));

export default useCalculation;
