import AuthForm from "components/AuthForm";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "myFirebase";
import React from "react";

//export default () => <span>Auth</span>;
const Auth = () => {
    const onSocialClick = async(event) => {
        const {
            target: { name },
        } = event; //ES6?
        let provider;
        //console.log(name)
        if(name === "google"){
            provider = new GoogleAuthProvider();            
        } else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider);
        //console.log(provider)
    }
    return (
        <div>
            <AuthForm/>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};
//편법, 아래와같이 하면 자동 import 가능
export default Auth;