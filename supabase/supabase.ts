import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://knvjnkvewylkavtgyign.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtudmpua3Zld3lsa2F2dGd5aWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkxOTgxODMsImV4cCI6MjAxNDc3NDE4M30.yw85ZoZmasFNY4s0j6AXpMGDXWlcAmeMw6q0eumd5KY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
