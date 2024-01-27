import { useNavigate } from 'react-router-dom';
import useFormData from '../hooks/useFormData';
import handleUserLoggedIn from '../handlers/handleUserLoggedIn';
import handlePostSubmit from '../handlers/handlePostSubmit';

const RegistrationForm = () => {
    const [ formData, handleChange ] = useFormData({})
    const navigate = useNavigate(); // Want to use this to redirect user to registration confirmation page 

    handleUserLoggedIn();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passwordCheck) {
            alert("Passwords do not match");
        } else {
            delete formData['passwordCheck']; // Don't need to keep doubles of the password
            try {
                const result = await handlePostSubmit(formData, '/users');
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
        <div>
            <form onSubmit={handleFormSubmit}>
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