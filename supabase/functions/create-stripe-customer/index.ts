// supabase/functions/create-stripe-customer/index.ts
import { createClient } from "jsr:@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.0.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

Deno.serve(async (req) => {
  try {
    const { user_id, email } = await req.json();

    if (!user_id || !email) {
      throw new Error("Missing user_id or email");
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email,
      metadata: { user_id },
    });

    // Update the profiles table
    const { error } = await supabase
      .from("profiles")
      .update({ stripe_customer_id: customer.id })
      .eq("user_id", user_id);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    return new Response(JSON.stringify({ error: err }), {
      status: 500,
    });
  }
});
