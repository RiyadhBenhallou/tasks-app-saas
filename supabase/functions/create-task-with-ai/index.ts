// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { PromptTemplate } from "npm:@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "npm:@langchain/google-genai";
import { StringOutputParser } from "npm:@langchain/core/output_parsers";

console.log("Hello from Functions!");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, x-client-info, apikey",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  const { title, description } = await req.json();
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Unauthorized",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${authHeader.split(" ")[1]}`, // user's JWT
        },
      },
    },
  );
  const { data: { user } } = await supabase.auth.getUser(
    authHeader.split(" ")[1],
  );
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
  });
  const promptTemplate = PromptTemplate.fromTemplate(
    "You are a helpful assistant, based on task title: {title} and description: {description}, return the suitable label for this task. The label should be one word. If you cannot find a suitable label, return 'other'.",
  );
  const chain = promptTemplate.pipe(model).pipe(new StringOutputParser());
  const aiResponse = await chain.invoke({ title, description });
  const { error } = await supabase.from("tasks").insert({
    title,
    description,
    label: aiResponse,
    // user_id: user?.id,
  });
  if (error) {
    console.log(error);
  }

  console.log("Task created with AI label:", aiResponse);

  return new Response(
    JSON.stringify({
      sucess: true,
      message: "Task created successfully",
      label: aiResponse,
    }),
    { headers: { "Content-Type": "application/json", ...corsHeaders } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-task-with-ai' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
