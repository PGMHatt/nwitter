import AuthForm from "components/AuthForm";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "myFirebase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter, faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm/>
            <div className="authBtns">
                <button className="authBtn" onClick={onSocialClick} name="google">Continue with Google <FontAwesomeIcon icon={faGoogle}/></button>
                <button className="authBtn" onClick={onSocialClick} name="github">Continue with Github <FontAwesomeIcon icon={faGithub}/></button>
            </div>
        </div>
    )
};
//편법, 아래와같이 하면 자동 import 가능
export default Auth;