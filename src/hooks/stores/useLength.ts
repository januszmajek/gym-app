import { create } from "zustand";

interface LengthStore {
    value: string;
    changeValue: (unit: string) => void;
}

const useLength = create<LengthStore>((set) => ({
    value: "Centymetr",
    changeValue: (unit: string) => set({ value: unit }),
}));

export default useLength;
