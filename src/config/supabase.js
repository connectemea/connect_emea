import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Uploads a file to a specified public storage bucket and returns its public URL.
 * @param {string} bucket - The name of the Supabase storage bucket.
 * @param {File} file - The file object to upload.
 * @returns {Promise<string>} The public URL of the uploaded file.
 */
export const uploadFile = async (bucket, file) => {
  if (!file) return null;
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
};

/**
 * Deletes a file from a specified storage bucket using its public URL.
 * @param {string} bucket - The name of the Supabase storage bucket.
 * @param {string} url - The public URL of the file to delete.
 */
export const deleteFile = async (bucket, url) => {
  if (!url) return;
  try {
    const parts = url.split(`/storage/v1/object/public/${bucket}/`);
    if (parts.length > 1) {
      const filePath = parts[1];
      const { error } = await supabase.storage.from(bucket).remove([filePath]);
      if (error) throw error;
    }
  } catch (err) {
    console.error("Failed to delete file from storage:", err);
  }
};
