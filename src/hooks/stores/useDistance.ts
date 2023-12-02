import { create } from "zustand";

interface DistanceStore {
    value: string;
    changeValue: (unit: string) => void;
}

const useDistance = create<DistanceStore>((set) => ({
    value: "Kilometr",
    changeValue: (unit: string) => set({ value: unit }),
}));

export default useDistance;
