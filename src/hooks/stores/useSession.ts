import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
interface SessionStore {
    session: Session | null;
    setSession: (session: Session | null) => void;
}

const useSession = create<SessionStore>((set) => ({
    session: null,
    setSession: (session) => set({ session: session }),
}));

export default useSession;
