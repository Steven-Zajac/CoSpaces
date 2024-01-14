import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import handleSubmit from "../handlers/handleSubmit";

const RegistrationForm = () => {

    const [formData, setFormData] = useState({});
    const navigate = useNavigate(); // Want to use this to redirect user to registration confirmation page 

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordCheck) {
            alert("Passwords do not match");
        } else {
            delete formData['passwordCheck']; // Don't need to keep doubles of the password
            try {
                const submitResult = await handleSubmit(formData);
                if (submitResult.status === 200) {
                    await navigate(`/register/${submitResult.data}`);
                } else {
                    console.log('Error processing user registration')
                }
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        }


    };

    return ( 
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1>New User Registration</h1>
                
                <div>
                    <label htmlFor="fname">First Name: </label>
                    <input type="text" id="fname" onChange={handleChange} placeholder="Joan" required></input>
                </div>

                <div>
                    <label htmlFor="lname">Last Name: </label>
                    <input type="text" id="lname" onChange={handleChange} placeholder="Smith" required></input>
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" onChange={handleChange} placeholder="joan.smith@email.com" required></input>
                </div>

                <div>
                    <label htmlFor="phone">Phone Number: </label>
                    <input type="tel" id="phone" onChange={handleChange} placeholder="514-555-5555" required></input>
                </div>

                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" onChange={handleChange} placeholder="*******" required></input>
                </div>

                <div>
                    <label htmlFor="passwordCheck">Verify Password </label>
                    <input type="password" id="passwordCheck" onChange={handleChange} placeholder="*******" required></input>
                </div>

                <input type="submit" value={"Submit"}></input>

            </form>
        </div>
    );
};

export default RegistrationForm;