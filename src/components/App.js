import AppRouter from "components/Router";
import React, {useState, useEffect} from "react";
import { authService } from "myFirebase"
import { onAuthStateChanged } from "firebase/auth";

function App() {  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => { //react hook
    onAuthStateChanged(authService,(user)=>{ 
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing.."}
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
  </>;
}

export default App;
