import React, {useEffect, useState} from "react";
import { signOut, updateProfile } from "firebase/auth";
import { authService } from "myFirebase";
import { useNavigate } from "react-router-dom";
import { where, query, collection, getDocs, orderBy } from "firebase/firestore";
import { dbService } from "myFirebase";
import { COLLECTION_NAME } from "./Home";

const Profile = ({userObj, refreshUser}) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        signOut(authService);
        navigate("/");
    };

    const getMyNweets = async () => {
        const q = query(collection(dbService, COLLECTION_NAME), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
        const nweets = await getDocs(q);
        console.log(nweets.docs.map((doc)=>doc.data()));
    }

    useEffect(() => {
        getMyNweets();
    }, [newDisplayName]);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async(event) => {
        event.preventDefault();        
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {displayName: newDisplayName});
            refreshUser();
        }
        
    }

    return ( //fregment?
        <>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
            <input type="submit" value ="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Log Out</button>;
        </>
    )
};

export default Profile;