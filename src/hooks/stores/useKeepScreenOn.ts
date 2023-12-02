import { create } from "zustand";

interface KeepScreenOnStore {
    value: boolean;
    switchValue: () => void;
}
const useKeepScreenOn = create<KeepScreenOnStore>((set) => ({
    value: true,
    switchValue: () =>
        set((state) => ({
            ...state,

            value: !state.value,
        })),
}));

export default useKeepScreenOn;
