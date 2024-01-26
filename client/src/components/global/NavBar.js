import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';

// Need to be able to switch to another structure of logged in (ie change both login and register to logout)

const NavBar = () => {
    const location = useLocation(); // Returns object with route location data
    //const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Checks if logged in 
    const logout = useLogout();

    // Will switch depending on which pathname is returned
    const renderedLinks = () => {
        switch(location.pathname) {
            case '/':
                return (
                    !userId ? (
                        <>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/register'>Register</NavLink>
                        </>
                    ) : 
                    (
                        <>
                            <NavLink to={`/user/${userId}/home`}>Home</NavLink>
                            <NavLink to={`/reservations/user/${userId}`}>Reservations</NavLink>
                            <NavLink to={`/user/${userId}/details`}>My Info</NavLink>
                            <button onClick={logout}>Logout</button>
                            {/* Can add a reservations tab and a user data tab */}
                        </>
                    )
                );
            case '/login': 
                return (
                    <>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                    </>
                );
            case '/register':
                return (
                    <>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/login'>login</NavLink>    
                    </>
                );
            default: 
                return (
                    !userId ? (
                        <>
                            <NavLink to='/'>Home</NavLink>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/register'>Register</NavLink>
                        </>
                    ) :
                    (
                        <>
                            <NavLink to={`/user/${userId}/home`}>Home</NavLink>
                            <NavLink to={`/reservations/user/${userId}`}>Reservations</NavLink>
                            <NavLink to={`/user/${userId}/details`}>My Info</NavLink>
                            <button onClick={logout}>Logout</button>
                            {/* Can add a reservations tab and a user data tab */}
                        </>
                    )
                );
        }
    };

    return (
        <nav>
            {renderedLinks()}
        </nav>
    )

};

export default NavBar;