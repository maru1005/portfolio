"use server";

import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(
  prevState: { success: boolean; error?: string },
  formData: FormData,
) {
  // honeypot: botにしか見えないフィールド
  const honeypot = formData.get("company") as string;
  if (honeypot) {
    // silently pretend success so bots don't learn to skip this field
    return { success: true };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: "全ての項目を入力してください" };
  }
  if (name.length > 100) {
    return { success: false, error: "お名前は100文字以内でお願いします" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: "メールアドレスの形式が正しくありません" };
  }
  if (message.length > 2000) {
    return { success: false, error: "メッセージは2000文字以内でお願いします" };
  }

  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, message });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
