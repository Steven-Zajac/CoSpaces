import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const navigate = useNavigate();
    const handleLogout =  () => {
        setTimeout(() => {
            localStorage.clear()
            window.location.reload();
        },2000)
        navigate('/');
        
    };
    return handleLogout;
};

export default useLogout;