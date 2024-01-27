
// Handles the deletion of a specific reservation 
const handleDeleteReservation = async (resId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete your reservation? This action cannot be undone.");

    if (isConfirmed) {
        try {
            const deletion = await fetch(`/api/reservations/${resId}`, {
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
                location.reload();
            }
        } catch (error) {
            throw error;
        }
    }
};

export default handleDeleteReservation;