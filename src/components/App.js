import AppRouter from "components/Router";
import React, {useState} from "react";
import {authService} from "myFirebase"

function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return <>
    <AppRouter isLoggedIn={isLoggedIn} />
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
  </>;
}

export default App;
