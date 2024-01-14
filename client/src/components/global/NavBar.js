import { NavLink, useLocation } from 'react-router-dom';

// Need to be able to switch to another structure of logged in (ie change both login and register to logout)

const NavBar = () => {
    const location = useLocation(); // Returns object with route location data
    
    // Will switch depending on which pathname is returned
    const renderedLinks = () => {
        switch(location.pathname) {
            case '/':
                return (
                    <>
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                    </>
                );
            case '/login': 
                return (
                    <>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/register'>Register</NavLink>
                    </>
                );
            default: 
                return (
                    <>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to='/login'>Login</NavLink>
                    </>
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
