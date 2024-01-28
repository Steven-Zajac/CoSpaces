import { useNavigate } from 'react-router-dom';

import useFormData from '../../hooks/useFormData';
//import handleUserLoggedIn from '../../handlers/handleUserLoggedIn';
import handlePostSubmit from '../../handlers/handlePostSubmit';

import styled from 'styled-components';

const RegistrationForm = () => {
    const [ formData, handleChange ] = useFormData({})
    const navigate = useNavigate(); // Want to use this to redirect user to registration confirmation page 

    //handleUserLoggedIn();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordCheck) {
            alert("Passwords do not match");
        } else {
            delete formData['passwordCheck']; // Don't need to keep doubles of the password
            try {
                const result = await handlePostSubmit(formData, '/api/users');
                if (result.status === 200) {
                    await navigate(`/register/${result.data}`);
                } else {
                    window.alert(result.message);
                    location.reload();
                }
            } catch (error) {
                throw error;
            }
        }
    };

    return ( 
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <DetailContainer>
                    <label htmlFor="fname">First Name: </label>
                    <input type="text" id="fname" onChange={handleChange} placeholder="Joan" required></input>
                </DetailContainer>

                <DetailContainer>
                    <label htmlFor="lname">Last Name: </label>
                    <input type="text" id="lname" onChange={handleChange} placeholder="Smith" required></input>
                </DetailContainer>

                <DetailContainer>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" onChange={handleChange} placeholder="joan.smith@email.com" required></input>
                </DetailContainer>

                <DetailContainer>
                    <label htmlFor="phone">Phone Number: </label>
                    <input type="tel" id="phone" onChange={handleChange} placeholder="514-555-5555" required></input>
                </DetailContainer>

                <DetailContainer>
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" onChange={handleChange} placeholder="*******" required></input>
                </DetailContainer>

                <DetailContainer>
                    <label htmlFor="passwordCheck">Verify Password </label>
                    <input type="password" id="passwordCheck" onChange={handleChange} placeholder="*******" required></input>
                </DetailContainer>

                <Submit type="submit" value={"Submit"}></Submit>

            </Form>
        </Container>
    );
};

export default RegistrationForm;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Form = styled.form`
    display: inline-block;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: auto;
    padding-top: 2vh;
`;

const DetailContainer = styled.div`
    display: grid;
    grid-template-columns: auto minmax(100px, 200px); // first col for labels and 2nd for inputs
    grid-gap: 8px; // custom spacing between
    align-items: center;
    margin-bottom: 10px;

    label {
        justify-self: end;
    }

    input {
        justify-self: start;
        width: 100%;
        font-size: 1rem;
    }

    input:placeholder-shown {
        text-align: center;
    }
`;

const Submit = styled.input`
    align-items: center;
    font-size: 1.25rem;
    color: #525151;
    background-color: #f7bb77;
    border-radius: 10px 10px;
    padding: 8px;
    margin-left: 40%;

    &:hover {
        background-color: #ed952f;
        color: white;
    }
`;