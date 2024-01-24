import { useNavigate } from 'react-router-dom';
import handleUserLoggedIn from '../handlers/handleUserLoggedIn';
import handleSubmit from '../handlers/handleSubmit';
import useFormData from '../hooks/useFormData';

const LoginForm = () => {
    const [ formData, handleChange ] = useFormData({})
    const navigate = useNavigate();

    handleUserLoggedIn();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await handleSubmit(formData, '/login');
            if (result.status === 200) {
                // Stores userId in local storage. Will use token for better security
                localStorage.setItem('userId', result.data[1]); 
                window.alert('Success!');
                // Navigate to user Dashboard
                await navigate(`/home/${result.data[1]}`)
            } else {
                window.alert(result.message);
                location.reload(); // Want to reload the page and empty values if password invalid
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