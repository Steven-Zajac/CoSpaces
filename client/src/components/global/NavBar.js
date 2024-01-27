import { NavLink } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

const NavBar = () => {
    const userId = localStorage.getItem('userId'); // Checks if logged in 
    const logout = useLogout();

    // Will switch depending on which pathname is returned
    const renderedLinks = () => {

        return (
            userId && 
            (
                <>
                    <NavLink to={`/user/${userId}/home`}>Home</NavLink>
                    <NavLink to={`/reservations/user/${userId}`}>Reservations</NavLink>
                    <NavLink to={`/user/${userId}/details`}>My Info</NavLink>
                    <button onClick={logout}>Logout</button>
                </>
            )
        );
    };

    return (
        <nav>
            {renderedLinks()}
        </nav>
    )

};

export default NavBar;
