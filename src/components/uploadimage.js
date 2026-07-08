const handleImageUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'connect_events'); // Using the same preset as in original code
    // jTHsUQlqnSN8fgTVcy9O2gjyNLs
    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dso2anhxs/image/upload', {
            method: "POST",
            body: formData,
        });


        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Cloudinary Response:", data);

        return data.secure_url || null;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};

export default handleImageUpload;