import { isArray, isEmpty } from "lodash";
import { create } from "zustand";

const useCalculation = create((set) => ({
  calculationItems: [],
  hasError: true,
  setCalculationItems: (calculationItems = []) =>
    set(() => ({ calculationItems })),
  addCalculationItem: (calculationItem) => {
    if (isEmpty(calculationItem) || isArray(calculationItem)) return;

    set((state) => ({
      calculationItems: [...state.calculationItems, calculationItem],
    }));
  },
  setHasError: (payload) => set(() => ({ hasError: payload })),
}));

export default useCalculation;
