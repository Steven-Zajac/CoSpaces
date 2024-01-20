import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import handleSubmit from '../handlers/handleSubmit';
//import handleChange from '../handlers/handleChange';

const LoginForm = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            if (result.status === 200) {
                console.log(result.data[1])

                // figure out a way that if this works, then we want to assign or store this value
                // somewhere an d

                // Must also delete local storage once the user logs out. 

                localStorage.setItem('userId', result.data[1]);

            } else {
                throw new Error (`Error: ${result.status}`)
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <h1>User Login</h1>
                <div>
                    <label htmlFor='loginId'>Email or Phone Number: </label>
                    <input type='text' id='loginId' onChange={handleChange} required></input>
                </div>

                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' onChange={handleChange} required></input>
                </div>
                <input type='submit' value={"Submit"}></input>

            </form>
        </div>
    );





};

export default LoginForm;