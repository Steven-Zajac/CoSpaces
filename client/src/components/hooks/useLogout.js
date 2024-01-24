import { useNavigate } from 'react-router-dom';

// This returns handleLogout function. 
// useNavigate can only be called at the top level of a react component 
// or within custom hooks. That is why we are returning handleLogout. 
const useLogout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };
    return handleLogout;
};

export default useLogout;