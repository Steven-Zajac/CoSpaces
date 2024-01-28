import { useNavigate } from "react-router-dom";

const useUserDeletionHandler = (userId) => {
    const navigate = useNavigate();
    const handleDeleteUser = async (userId) => {
    
        const isConfirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        
        if (isConfirmed) {
            try {
                const deletion = await fetch(`/api/users/${userId}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                });
                if (!deletion.ok) {
                    throw new Error(`Error: ${deletion.status}`);
                } else {
                    window.alert('Success!');
                    navigate('/');
                    setTimeout(localStorage.clear(), 5000);
                }
            } catch (error) {
                throw error;
            }
        }
    };  
    return handleDeleteUser;
};

export default useUserDeletionHandler;