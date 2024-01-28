import { useState } from "react";
import styled from "styled-components";

import handleNoUser from "../../handlers/handleNoUser";
import handlePatchSubmit from '../../handlers/handlePatchSubmit';

import useFetch from "../../hooks/useFetch";
import useFormData from "../../hooks/useFormData";
import useLogout from "../../hooks/useLogout";
import useUserDeletionHandler from "../../hooks/useUserDeletionHandler";

import Loading from "../Global/Loading";

const UserData = () => {

    handleNoUser();
    const userId = localStorage.getItem('userId');
    const { isLoading, data } = useFetch(`/api/users/${userId}`);
    const [ formData, handleChange ] = useFormData({})
    const [isEditMode, setIsEditMode] = useState(false);
    const profileDelete = useUserDeletionHandler();
    const logout = useLogout();

    // Toggles whether we are in edit more or not. 
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode); 
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const result = await handlePatchSubmit(formData, `/api/users/${userId}`);
            if (result.status === 200) {
                window.alert('Success!');
                location.reload();
            } else {
                //window.alert(result.message);
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
                <Container>
                    <Form onSubmit={handleSave}>
                        <DetailContainer>
                            <label htmlFor="fname">First Name: </label>
                            {isEditMode ? (
                                <input type="text" id="fname" onChange={handleChange}></input>
                            ) : (
                                <span id="fname">{data.fname}</span>
                            )}
                        </DetailContainer>
                        <DetailContainer>
                            <label htmlFor="lname">Last Name: </label> 
                            {isEditMode ? (
                                <input type="text" id="lname" onChange={handleChange}></input>
                            ) : (
                                <span>{data.lname}</span>
                            )}
                        </DetailContainer>
                        <DetailContainer>
                            <label htmlFor="email">Email: </label> 
                            {isEditMode ? (
                                <input type="email" id="email" onChange={handleChange}></input>
                            ) : (
                                <span>{data.email}</span>
                            )}
                        </DetailContainer>
                        <DetailContainer>
                            <label htmlFor="phone">Phone Number: </label>
                            {isEditMode ? (
                                <input type="tel" id="phone" onChange={handleChange}></input>
                            ) : (
                                <span>{data.phone}</span>
                            )}
                        </DetailContainer>
                        <ButtonContainer>
                            {isEditMode && (
                                <>
                                    <Button type="submit" >Save</Button>
                                    <Button onClick={toggleEditMode}>Cancel</Button>
                                </>
                            )}
                        </ButtonContainer>
                        <ButtonContainer>
                            {!isEditMode && (
                                <> 
                                    <Button onClick={toggleEditMode}>Modify</Button>
                                    <Button onClick={() => profileDelete(userId)}>Delete Account</Button>
                                </>
                            )}
                        </ButtonContainer>
                    </Form>
                </Container> : 
                !isLoading && !data ? 
                (<h1>User not found</h1> && logout()) :
                <Loading />
            }
        </>
    )


};

export default UserData;


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    display: flexbox;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 20vh;
    padding: 2.75rem;
    background-color: rgba(216, 233, 242, .6);
    margin-top: 5rem;
    border: solid black 1px;
    border-radius: 10px;
`;

const DetailContainer = styled.div`
    display: grid;
    grid-template-columns: auto minmax(100px, 200px); 
    grid-gap: 9px; // custom spacing between
    align-items: center;
    margin-bottom: 15px;
    label {
        justify-self: start;
    }

    input {
        justify-self: start;
        width: 100%;
        font-size: 1rem;
    }

    span {
        justify-self: start;
        width: 100%;
        font-size: 1rem;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    //align-items: ;
    justify-content: space-around;
    margin-top: 1.25rem;
`;

const Button = styled.button`
    align-items: center;
    background-color: #ed952f;
    color: white;
    border-radius: 10px 10px;
    padding: 8px;
    font-size: 1rem;

    &:hover {
        background-color: #cbddf5;
    }

`;