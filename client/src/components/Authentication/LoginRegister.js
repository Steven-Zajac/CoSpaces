import styled from "styled-components";

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
            <div>
                <div>
                    <span>Login</span>
                    <SwitchBox>
                        <SLiderInputChecked type="checkbox" checked={isRegister} onChange={toggleRegister} />
                        <Slider />
                    </SwitchBox>
                    <span>Register</span>
                </div>
                <div>
                    {!isRegister ? (
                        <LoginForm />
                    ) : (
                        <RegistrationForm />
                    )}
                </div>
            </div>
        </>
    )
};

export default LoginRegister;

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