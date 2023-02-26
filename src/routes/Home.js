import Nweet from "components/Nweet";
import { addDoc, query, collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "myFirebase";
import React, {useState, useEffect} from "react";
import { v4 } from 'uuid';

export const COLLECTION_NAME = "nweets"

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");    
    const [nweets, setNweets] = useState([]);    
    const [attachment, setAttachment] = useState("");    

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
        console.log(userObj.uid);
        let attachmentUrl = ""
        if(attachment !== "")
        {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            console.log("response", response);
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const cuurentNweet = {
            text:nweet, createdAt : Date.now(), creatorId:userObj.uid,
            attachmentUrl: attachmentUrl
        }
        await addDoc(collection(dbService, COLLECTION_NAME), cuurentNweet);
        setNweet("");
        setAttachment("");
    }
    const onChange = (event) => {
        const {target:{value}} = event;        
        setNweet(value)
    }
    const onFileChange = (event) => {
        const {target : {files},} = event;
        const theFile = files[0];

        const reader = new FileReader();
        console.log("create fileReader");
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {currentTarget:{result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile)
    }
    const onClickClearAttachment = () => setAttachment(null);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value ={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" alt="profile"/>
                        <button onClick={onClickClearAttachment}>Clear</button>
                    </div>)} 
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