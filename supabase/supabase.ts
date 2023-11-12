import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yvhykciyaxvmkfrtokvl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aHlrY2l5YXh2bWtmcnRva3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2Mzk5MjcsImV4cCI6MjAxNTIxNTkyN30.Xk1dcxB3hZTgPFiVNrQwTr4aQI2lqI5t9VzAtcz2ZZ4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
