import styled from "styled-components";
import backgroundImage from '../../assets/loginpic.avif';

import { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

const LoginRegister = () => {

    const [isRegister, setIsRegister] = useState(false);

    const toggleRegister = () => {
        setIsRegister(!isRegister); 
    };
    
    // Want to toggle between registration and logging in
    // Also bolden the text depending on toggle register

    return (

        <> 
            <Background></Background>                
                <Content>
                    <Title>CoSpaces</Title>
                    <ToggleFormContainer>
                        <ToggleContainer>
                            <ToggleText checked={!isRegister}>Login</ToggleText>
                            <SwitchBox>
                                <SLiderInputChecked type="checkbox" checked={isRegister} onChange={toggleRegister} />
                                <Slider />
                            </SwitchBox>
                            <ToggleText checked={isRegister}>Register</ToggleText>
                        </ToggleContainer>
                        <FormContainer>
                            {!isRegister ? (
                                <LoginForm />
                            ) : (
                                <RegistrationForm />
                            )}
                        </FormContainer>
                    </ToggleFormContainer>
                </Content>
            
        </>
    )
};

export default LoginRegister;

const Background = styled.div`
    background-image: url(${backgroundImage}); /* Your image path */
    background-repeat: no-repeat;
    background-position: center;
    position: absolute; 
    height: 100vh;
    width: 100%;
    opacity: .35;
    z-index: -1;
    
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 8%;
    z-index: 2;
    color: white;
`;

const Title = styled.h1`
    font-weight: bolder;
    font-size: 50px;
    color: #C10000; 
`;

const ToggleFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: center;
    background-color: rgba(199, 198, 197, .75);
    padding: 15px;
    min-height: 45vh;
    min-width: 35vw;
`;

const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4vh;
`;

const ToggleText = styled.span`
    font-size: 18px;
    color: ${props => props.checked ? '#cc4949' : ''};
    padding: 5px;
`;

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SwitchBox = styled.label`
    position: relative;
    display: inline-block;
    width: 37px;
    height: 17px;
    border: .5px solid black;
    border-radius: 17px;
`;

const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: yellow;
    transition: .4s;
    border-radius: 17px;

    &:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 3px;
        bottom: 2px;
        background-color: red;
        transition: .4s;
        border-radius: 50%;
    }
`;

const SLiderInputChecked = styled(SwitchInput)`
    &:checked + ${Slider} {
        background-color: #2196F3;
    }

    &:focus + ${Slider} {
        box-shadow: 0 0 1px #2196F3;
    }

    &:checked + ${Slider}:before {
        transform: translateX(18px);
    }
`;