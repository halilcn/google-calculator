import { create } from "zustand";
import { BUTTON_TYPES } from "../constants";

const useCalculation = create((set) => ({
  calculationItems: [],
  setCalculationItems: (items = []) => set(() => ({ calculationItems: items })),
  addCalculationItem: (item) =>
    set((state) => ({ calculationItems: [...state.calculationItems, item] })),
}));

export default useCalculation;
