// supabase/functions/user-engine/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://thecodestreak.vercel.app",
  "http://localhost:54321", // Supabase local dev
];

serve(async (req) => {
  const origin = req.headers.get("origin");
  const isAllowedOrigin = allowedOrigins.includes(origin || "");
  const corsHeaders = {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!isAllowedOrigin) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Origin not allowed",
      }),
      {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  const { step, payload } = await req.json();

  if (!step || !payload) {
    return new Response(JSON.stringify({ error: "Missing step or payload" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  try {
    switch (step) {
      case "GET_DAILY_QUESTIONS_FOR_USER": {
        const { user_id } = payload;
        if (!user_id) throw new Error("Missing user_id");

        const today = new Date().toISOString().split("T")[0];

        const { data: assignments, error } = await supabase
          .from("daily_assignments")
          .select(
            `
            id,
            is_main,
            completed,
            assigned_date,
            questions (
              id,
              title,
              description,
              level,
              difficulty
            )
          `
          )
          .eq("user_id", user_id)
          .eq("assigned_date", today)
          .order("is_main", { ascending: false });

        if (error) throw error;

        return new Response(
          JSON.stringify({
            step,
            success: true,
            daily_questions: assignments,
          }),
          { status: 200, headers: corsHeaders }
        );
      }

      // 🚀 Add more steps here like:
      // case 'SUBMIT_QUESTION':
      // case 'GET_USER_PROFILE':

      default:
        return new Response(
          JSON.stringify({ error: `Unknown step: ${step}` }),
          { status: 400, headers: corsHeaders }
        );
    }
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
