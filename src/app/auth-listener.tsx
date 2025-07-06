"use client";
import { useEffect } from "react";
import { createClient } from "../lib/supabase/client";

export default function AuthListener() {
  useEffect(() => {
    const supabase = createClient();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const user = session?.user;

          // Call your edge function to create Stripe customer
          const { error } = await supabase.functions.invoke(
            "create-stripe-customer",
            {
              body: {
                user_id: user?.id,
                email: user?.email,
              },
            }
          );
          if (error) {
            console.log(error.message);
          }
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return null; // optional
}
