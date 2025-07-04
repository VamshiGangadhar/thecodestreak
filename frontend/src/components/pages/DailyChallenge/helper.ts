// Helper to call the Supabase Edge Function for daily questions
import { supabase } from "../../../supabaseClient";

export async function getDailyQuestionsForUser(user_id: string) {
  try {
    const { data, error } = await supabase.functions.invoke("user-engine", {
      body: {
        step: "GET_DAILY_QUESTIONS_FOR_USER",
        payload: { user_id },
      },
    });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error fetching daily questions:", err);
    return null;
  }
}
