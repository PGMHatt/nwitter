import Nweet from "components/Nweet";
import { addDoc, query, collection, onSnapshot } from "firebase/firestore";
import { dbService } from "myFirebase";
import React, {useState, useEffect} from "react";
export const COLLECTION_NAME = "nweets"

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");    
    const [nweets, setNweets] = useState([]);    

    useEffect(() => {        
        const q = query(collection(dbService, COLLECTION_NAME));
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
    
    const onSubmit = async(event) => {
        event.preventDefault();
        await addDoc(collection(dbService, COLLECTION_NAME), 
            {text:nweet, createdAt : Date.now(), creatorId:userObj.uid})
        setNweet("")
    }
    const onChange = (event) => {
        const {target:{value}} = event;        
        setNweet(value)
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value ={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={userObj.uid===nweet.creatorId}/>
                ))}
            </div>
        </div>
    );
};
export default Home;