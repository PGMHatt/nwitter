import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";


const AppRouter = ({isLoggedIn, userObj, refreshUser, userName}) => {
    console.log(isLoggedIn)
    return (
        <Router>
            {isLoggedIn && <Navigation userDisplayName={userName} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={<Home userObj={userObj}/>}/>                            
                        <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>   
                    </>
                ) : (
                    <Route exact path="/" element={<Auth/>}/>
                )}
            </Routes>
        </Router>
    );
};
export default AppRouter;