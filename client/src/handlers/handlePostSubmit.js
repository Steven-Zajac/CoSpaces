// Used to POST new reservation, new user registration or login
const handlePostSubmit = async (formData, uri) => {
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

export default handlePostSubmit;