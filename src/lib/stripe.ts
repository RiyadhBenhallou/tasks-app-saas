"use server";
import { Stripe } from "stripe";
import { createClient } from "./supabase/server";

export async function createStripeCustomer(email: string, user_id: string) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const customer = await stripe.customers.create({
        email,
        metadata: {
            user_id,
        },
    });
    const supabase = await createClient();
    const { error } = await supabase.from("profiles").insert({
        tasks_limit: 20,
        stripe_customer_id: customer.id,
    });
    if (error) {
        console.log(error);
    }
}
