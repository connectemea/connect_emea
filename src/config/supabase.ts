import { createClient } from '@supabase/supabase-js';
import { compressImage } from '@/utils/imageCompressor';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Uploads a file to a specified public storage bucket, compressing images if needed,
 * and returns its public URL.
 */
export const uploadFile = async (
  bucket: string,
  file: File,
  folder: string = '',
  customFileName?: string
): Promise<string | null> => {
  if (!file) return null;

  let uploadFile = file;

  if (file.type.startsWith('image/')) {
    try {
      uploadFile = await compressImage(file);
    } catch (err) {
      console.error("Image compression failed:", err);
    }
  }

  const fileExt = uploadFile.name.split('.').pop();

  const fileName = customFileName
    ? `${customFileName}.${fileExt}`
    : `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

  const prefix = folder ? `${folder.replace(/\/$/, '')}/` : '';
  const filePath = `${prefix}${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, uploadFile, {
      upsert: true, // Optional: overwrite if the same filename exists
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
};

/**
 * Deletes a file from a specified storage bucket using its public URL.
 */
export const deleteFile = async (bucket: string, url: string): Promise<void> => {
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
