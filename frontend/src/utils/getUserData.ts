import { User } from "../context/UserContext";
import { supabase } from "../supabaseClient";

export async function getUserData(): Promise<User | null> {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user || null;
  if (!user) {
    return null;
  }
  const { id } = user;

  let { data: userDetails, error } = await supabase
    .from("profiles")
    .select(
      "id,first_name, last_name, display_name, created_at, email, avatar_url, level, points, streak"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return null;
  }

  if (!userDetails) {
    return null;
  }

  return userDetails;
}
