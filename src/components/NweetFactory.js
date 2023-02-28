import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import { COLLECTION_NAME } from "routes/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");    
    const [attachment, setAttachment] = useState("");    

    const onSubmit = async(event) => {
        event.preventDefault();
        console.log(userObj.uid);
        let attachmentUrl = ""
        if(nweet == "") {
            return;
        }
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
            <form onSubmit={onSubmit}  className="factoryForm" >
                <div className="factoryInput__container">
                    <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                    <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                </div>
                <label htmlFor="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input type="file" id="attach-file" accept="image/*" onChange={onFileChange} style={{opacity:0,}}/>
                {attachment && (
                    <div className="factoryForm__attachment">
                    <img
                      src={attachment}
                      style={{
                        backgroundImage: attachment,
                      }}
                    />
                    <div className="factoryForm__clear" onClick={onClickClearAttachment}>
                      <span>Remove</span>
                      <FontAwesomeIcon icon={faTimes} />
                    </div>
                  </div>)} 
            </form>
        </div>
    );

}

export default NweetFactory;