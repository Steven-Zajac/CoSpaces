import { useNavigate } from 'react-router-dom';
import handleUserLoggedIn from '../handlers/handleUserLoggedIn';
import handlePostSubmit from '../handlers/handlePostSubmit';
import useFormData from '../hooks/useFormData';

import styled from 'styled-components';

const LoginForm = () => {
    
    handleUserLoggedIn();

    const [ formData, handleChange ] = useFormData({})
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await handlePostSubmit(formData, '/api/login');
            if (result.status === 200) {
                // Stores userId in local storage. Will use token for better security
                localStorage.setItem('userId', result.data[1]); 
                window.alert('Success!');
                // Navigate to user Dashboard
                await navigate(`/user/${result.data[1]}/home`)
            } else {
                window.alert(result.message);
                location.reload(); // Want to reload the page and empty values if password invalid
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <Container>
            <Form onSubmit={handleFormSubmit}>
                <DetailContainer>
                    <label htmlFor='loginId'>Email or Phone: </label>
                    <input type='text' id='loginId' onChange={handleChange} required></input>
                </DetailContainer>

                <DetailContainer>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' onChange={handleChange} required></input>
                </DetailContainer>
                <Submit type='submit' value={"Submit"}></Submit>

            </Form>
        </Container>
    );

};

export default LoginForm;


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
    padding: 15px 20px 40px;
    margin-top: 2.5rem;
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
    text-align: center;

    &:hover {
        background-color: #ed952f;
        color: white;
    }
`;