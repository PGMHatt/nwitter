import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authService } from "myFirebase";
import React, {useState} from "react";

//export default () => <span>Auth</span>;
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
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

    const toggleAccount = () => setNewAccount((prev) =>!prev);
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
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};
//편법, 아래와같이 하면 자동 import 가능
export default Auth;