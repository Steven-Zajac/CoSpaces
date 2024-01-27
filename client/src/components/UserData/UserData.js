import { useState } from "react";

import handleNoUser from "../handlers/handleNoUser";
import handlePatchSubmit from "../handlers/handlePatchSubmit";

import useFetch from "../hooks/useFetch";
import useFormData from "../hooks/useFormData";
import useLogout from "../hooks/useLogout";
import useUserDeletionHandler from "../hooks/useUserDeletionHandler";

import Loading from "../Global/Loading";

const UserData = () => {

    handleNoUser();
    const userId = localStorage.getItem('userId');
    const { isLoading, data } = useFetch(`/users/${userId}`);
    const [ formData, handleChange ] = useFormData({})
    const [isEditMode, setIsEditMode] = useState(false);
    const profileDelete = useUserDeletionHandler();
    const logout = useLogout();

    console.log(formData)
    // Toggles whether we are in edit more or not. 
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode); 
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const result = await handlePatchSubmit(formData, `/users/${userId}`);
            if (result.status === 200) {
                window.alert('Success!');
                location.reload();
            } else {
                window.alert(result.message);
                //location.reload();
                setIsEditMode(true);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            {
                !isLoading && data ? 
                <div>
                    <form onSubmit={handleSave}>
                        <div>
                            <label htmlFor="fname">First Name: </label>
                            {isEditMode ? (
                                <input type="text" id="fname" onChange={handleChange}></input>
                            ) : (
                                <span id="fname">{data.fname}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="lname">Last Name: </label> 
                            {isEditMode ? (
                                <input type="text" id="lname" onChange={handleChange}></input>
                            ) : (
                                <span>{data.lname}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label> 
                            {isEditMode ? (
                                <input type="email" id="email" onChange={handleChange}></input>
                            ) : (
                                <span>{data.email}</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="phone">Phone Number: </label>
                            {isEditMode ? (
                                <input type="tel" id="phone" onChange={handleChange}></input>
                            ) : (
                                <span>{data.phone}</span>
                            )}
                        </div>
                        <div>
                            {isEditMode && (
                                <>
                                    <button type="submit" >Save</button>
                                    <button onClick={toggleEditMode}>Cancel</button>
                                </>
                            )}
                        </div>
                    </form>
                    <div>
                        {!isEditMode && (
                            <> 
                                <button onClick={toggleEditMode}>Modify</button>
                                <button onClick={() => profileDelete(userId)}>Delete Account</button>
                            </>
                        )}
                    </div>
                </div> : 
                !isLoading && !data ? 
                (<h1>User not found</h1> && logout()) :
                <Loading />
            }
        </>
    )


};

export default UserData;

// <button type="submit" onClick={isEditMode ? handleSave : toggleEditMode}>{isEditMode ? 'Save' : 'Modify'}</button>
//<button onClick={isEditMode ? () => setIsEditMode(!isEditMode) : () => profileDelete(userId)}>{isEditMode ? 'Cancel' : 'Delete Account'}</button>