import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://thecodestreak.vercel.app",
  "http://localhost:54321", // Supabase local dev
  "https://supabase.com",
];

serve(async (req) => {
  const origin = req.headers.get("origin");
  const isAllowedOrigin = !origin || allowedOrigins.includes(origin);
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
    console.warn("Request from disallowed origin:", origin);
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
    Deno.env.get("SUPABASE_ANON_KEY")!,
    {
      global: {
        headers: {
          Authorization: req.headers.get("authorization") ?? "",
        },
      },
    }
  );

  let step, payload;

  try {
    const body = await req.json();
    step = body.step;
    payload = body.payload;
    console.log("Received step:", step);
    console.log("Received payload:", payload);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  if (!step || !payload) {
    console.warn("Missing step or payload");
    return new Response(JSON.stringify({ error: "Missing step or payload" }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  try {
    switch (step) {
      case "GET_DAILY_QUESTIONS_FOR_USER": {
        const { user_id } = payload;
        if (!user_id) {
          console.error("Missing user_id in payload");
          throw new Error("Missing user_id");
        }

        const today = new Date().toISOString().split("T")[0];
        console.log("Querying for user_id:", user_id);
        console.log("Querying for assigned_date:", today);

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

        if (error) {
          console.error("Supabase query error:", error);
          throw error;
        }

        console.log("Assignments returned:", assignments);

        return new Response(
          JSON.stringify({
            step,
            success: true,
            daily_questions: assignments,
          }),
          { status: 200, headers: corsHeaders }
        );
      }

      default:
        console.warn("Unknown step received:", step);
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
