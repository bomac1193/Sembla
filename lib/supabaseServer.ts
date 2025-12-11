import { createClient } from "@supabase/supabase-js";
import { Database, AvatarRow } from "./types";

export const createServiceClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
};

export const uploadToStorage = async (file: File, path: string) => {
  const client = createServiceClient();
  if (!client) return null;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "faces";
  const { data, error } = await client.storage.from(bucket).upload(path, file, {
    upsert: true,
    contentType: file.type
  });
  if (error) throw error;
  const { data: publicUrl } = client.storage.from(bucket).getPublicUrl(data.path);
  return publicUrl.publicUrl;
};

export const insertAvatar = async (payload: AvatarRow) => {
  const client = createServiceClient();
  if (!client) return null;
  const { data, error } = await client.from("avatars").insert(payload).select().single();
  if (error) throw error;
  return data;
};

export const listAvatars = async (limit = 25) => {
  const client = createServiceClient();
  if (!client) return [];
  const { data, error } = await client
    .from("avatars")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
};
