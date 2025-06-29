import { supabase } from "../supabaseClient";

export async function checkUserProfile(email: string, name = null) {
  try {
    console.log("Checking user profile for email:", email);
    const { data, error } = await supabase.functions.invoke("auth", {
      body: { email, name },
    });

    if (error) {
      console.error("Error calling function:", error);
      return null;
    }

    if (data && data.success) {
      console.log("Profile found:", data.profile);
      return data;
    } else {
      console.log("Profile not found:", data?.message);
      return null;
    }
  } catch (error) {
    console.error("Error calling function:", error);
    return null;
  }
}
