import { create } from "zustand";

interface DistanceStore {
    value: string;
    changeValue: (unit: string) => void;
}

const useDistanceStore = create<DistanceStore>((set) => ({
    value: "Kilometr",
    changeValue: (unit: string) => set({ value: unit }),
}));

export default useDistanceStore;
