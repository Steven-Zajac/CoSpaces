
// Deletes user profile and reservations
const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    
    if (isConfirmed) {
        try {
            const deletion = await fetch(`/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            if (!deletion.ok) {
                throw new Error(`Error: ${deletion.status}`);
            } else {
                window.alert('Success!')
                await navigate('/');
                localStorage.clear();
            }
        } catch (error) {
            throw error;
        }
    }
};

export default handleDeleteUser;