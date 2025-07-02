"use server";

import { promptTemplate } from "@/lib/utils";
import { headers } from "next/headers";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createClient } from "@/lib/supabase/server";

export async function createTaskWithAi(
    title: string,
    description: string | undefined,
) {
    const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        temperature: 0,
        apiKey: process.env.GEMINI_API_KEY!,
    });
    const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());
    const aiResponse = await chain.invoke({ title, description });
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    await supabase.from("tasks").insert({
        title,
        description,
        label: aiResponse,
        // user_id: session?.user.id,
    });
}
