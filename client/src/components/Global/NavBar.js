import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const userId = localStorage.getItem('userId'); // Checks if logged in 
    const logout = useLogout();
    return (
        userId && 
        (
            <NavContainer>
                <StyledNav to={`/user/${userId}/home`}>Home</StyledNav>
                <StyledNav to={`/reservations/user/${userId}`}>Reservations</StyledNav>
                <StyledNav to={`/user/${userId}/details`}>My Info</StyledNav>
                <StyledNav onClick={logout}>Logout</StyledNav>
            </NavContainer>
        )
    );
};

export default NavBar;


const NavContainer = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 1vh;
    padding-bottom: 1vh;
    font-size: 20px;
    background: linear-gradient(to bottom, #ff9999 0%, #ffcc99 100%);
    text-decoration: none;
    //border: solid black 2px;

    a:hover {
        transform: scale(1.3);
        color: white;
    }

`;

const StyledNav = styled(NavLink)`
    margin-right: 20px;
    text-decoration: none;
    color: #865fb3;


    &.active {
        color: #ed3434;
        border-bottom: solid black;
    }
    
    &:nth-child(4) {
        color: #ab0c03;
        font-size: 19px;
        border: solid black 1px;
        padding: 8px;
        background-color: #e2e3d5;
        border-radius: 10px;
    }
`;