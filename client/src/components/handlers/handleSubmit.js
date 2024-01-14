// Handles the submission of the registration form data. ** might be used for more submissions*

const handleSubmit = async (formData) => {
    try {
        const response = await fetch("/users", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Errors: ${error}`);
        throw error; 
    }
};

export default handleSubmit;