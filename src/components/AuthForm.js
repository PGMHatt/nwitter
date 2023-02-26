import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { authService } from "myFirebase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const toggleAccount = () => setNewAccount((prev) =>!prev);
    const onChange = (event) => {
        //console.log(event.target.name);
        const {
            target: {name, value},
        } = event; //event.target 의 name과 value를 가져옴 const {a, b} = stuct
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } 
    };
    const onSubmit = async(event)  => {
        event.preventDefault();  
        try {
            let data;
            //console.log(newAccount)
            if(newAccount){
                //create account
                data = await createUserWithEmailAndPassword(authService, email, password)
            } else {
                // log in
                data = await signInWithEmailAndPassword(authService, email, password)
            }
            console.log(data);
        } catch (error) {
            console.log(error); 
            setError(error.message)
        }
    };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount? "Sign In" : "Create Account"}</span>
        </>
        );
    
}

export default AuthForm;