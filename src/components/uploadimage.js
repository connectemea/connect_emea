import { uploadFile } from '@/config/supabase';

const handleImageUpload = async (file,  fileName) => {
    if (!file) return null;
    try {
        const publicUrl = await uploadFile(`connect_assets`, file, 'events', fileName);
        return publicUrl;
    } catch (error) {
        console.error("Error uploading image to Supabase:", error);
        return null;
    }
};

export default handleImageUpload;