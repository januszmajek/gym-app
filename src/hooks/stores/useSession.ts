import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
interface SessionStore {
    session?: Session;
    setSession: (session: Session) => void;
}

const useSession = create<SessionStore>((set) => ({
    setSession: (session) => set({ session: session }),
}));

export default useSession;
