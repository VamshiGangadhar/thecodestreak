import { supabase } from "../../../supabaseClient";

export async function getDailyQuestionsForUser(user_id: string) {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token;

    const { data, error } = await supabase.functions.invoke("user-engine", {
      body: {
        step: "GET_DAILY_QUESTIONS_FOR_USER",
        payload: { user_id },
      },
      headers: {
        Authorization: `Bearer ${accessToken}`, // ✅ Pass user's token here
      },
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Error fetching daily questions:", err);
    return null;
  }
}
