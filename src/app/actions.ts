"use server";

import { supabase } from "@/lib/supabase";

export async function submitContact(
  prevState: { success: boolean; error?: string },
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, message });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
