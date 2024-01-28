// Used to PATCH user or reservation data
const handlePatchSubmit = async (formData, uri) => {
    try {
        const response = await fetch(uri, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
};

export default handlePatchSubmit;