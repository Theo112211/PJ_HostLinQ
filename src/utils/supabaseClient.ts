
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export function useSupabaseAuth() {
  const { getToken, userId } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const setupSupabaseAuth = async () => {
      try {
        if (!userId) {
          // If not signed in, don't try to set the auth header
          setIsLoading(false);
          return;
        }

        // Get a JWT for the current user from Clerk
        const token = await getToken({ template: "supabase" });
        
        // Set auth header for all Supabase requests
        if (token) {
          supabase.auth.setSession({
            access_token: token,
            refresh_token: "",
          });
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error setting up Supabase auth:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setIsLoading(false);
      }
    };

    setupSupabaseAuth();
  }, [getToken, userId]);

  return { isLoading, error, userId };
}
