import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { query, collection, onSnapshot, orderBy } from "firebase/firestore";
import { dbService } from "myFirebase";
import React, {useState, useEffect} from "react";

export const COLLECTION_NAME = "nweets"

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);    

    useEffect(() => {        
        const q = query(collection(dbService, COLLECTION_NAME), orderBy("createdAt", "desc"));        
        onSnapshot(q, (snapshot) =>{  
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setNweets(nweetArray);
              console.log("changes:",snapshot.docChanges());

        }, (error) =>{
            console.log("error:", error.message);  
        })

        return;
    }, []);
    
    return (
    <div className="container">
        <NweetFactory userObj={userObj}/>
        <div style={{ marginTop: 30 }}>
            {nweets.map((nweet) => (
            <Nweet key={nweet.id} nweetObj={nweet} isOwner={userObj.uid===nweet.creatorId}/>
            ))}
        </div>
    </div>    

    );
   
};
export default Home;