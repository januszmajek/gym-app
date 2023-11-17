import { create } from "zustand";

interface VibrateStore {
    value: boolean;
    switchValue: () => void;
}
const useVibrate = create<VibrateStore>((set) => ({
    value: true,
    switchValue: () =>
        set((state) => ({
            ...state,

            value: !state.value,
        })),
}));

export default useVibrate;
