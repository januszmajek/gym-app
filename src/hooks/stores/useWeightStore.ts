import { create } from "zustand";

interface WeightStore {
    value: string;
    changeValue: (unit: string) => void;
}

const useWeightStore = create<WeightStore>((set) => ({
    value: "Kilogram",
    changeValue: (unit: string) => set({ value: unit }),
}));

export default useWeightStore;
