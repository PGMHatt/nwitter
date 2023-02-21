import AppRouter from "components/Router";
import React, {useState, useEffect} from "react";
import { authService } from "myFirebase"
import { onAuthStateChanged } from "firebase/auth";

function App() {  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => { //react hook
    onAuthStateChanged(authService,(user)=>{ 
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing.."}
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
  </>;
}

export default App;
