import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "myFirebase";
import { useNavigate } from "react-router-dom";


export default () => {    
    const navigate = useNavigate();

    const onLogOutClick = () => {
        signOut(authService);
        navigate("/");
    };
    return ( //fregment?
        <>
            <button onClick={onLogOutClick}>Log Out</button>;
        </>
    )
};