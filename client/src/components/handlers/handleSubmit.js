// Handles the submission of the registration form data. ** might be used for more submissions*

const handleSubmit = async (formData, uri) => {
    try {
            const response = await fetch(uri, {
            method: "POST",
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

export default handleSubmit;