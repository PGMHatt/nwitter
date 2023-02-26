import React from "react"
import {Link} from "react-router-dom"


const Navigation = ({userDisplayName}) => {
    return (<nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/Profile">{userDisplayName}의 Profile</Link>
            </li>
        </ul>
    </nav>);
} 
export default Navigation;