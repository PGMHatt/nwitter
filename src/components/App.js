import AppRouter from "components/Router";
import React, {useState, useEffect} from "react";
import { authService } from "myFirebase"
import { onAuthStateChanged } from "firebase/auth";

function App() {  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userDisplayName, setUserDisplayName] = useState("");
  useEffect(() => { //react hook
    onAuthStateChanged(authService,(user)=>{ 
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
        setUserDisplayName(user.displayName);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []); 

  const refreshUser = () => {
    setUserDisplayName(authService.currentUser.displayName);
    //setUserObj(authService.currentUser);
    console.log("refresh user ->", authService.currentUser.displayName)
  }

  return (<>
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} userName={userDisplayName}/> : "Initializing.."}
  </>);
}

export default App;
