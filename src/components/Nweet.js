import { dbService, storageService } from "myFirebase";
import React, {useState} from "react"
import { COLLECTION_NAME } from "routes/Home";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
    
    const onDeleteClick = async () =>{
        const ok = window.confirm("Ard you sure you want to delete this nweet?")        
        console.log("ok?", ok);
        if(ok){
            //delete nweet
            const NweetTextRef = doc(dbService, COLLECTION_NAME, `${nweetObj.id}`);
            await deleteDoc(NweetTextRef);
            
            //delete photo
            const attachmentRef = ref(storageService, nweetObj.attachmentUrl);
            await deleteObject(attachmentRef);            
        }
    }

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const toggleEditing = () => setEditing((prev) => !prev);

    const onEditSubmit = async (event) => {
        //update nweet
        event.preventDefault();        
        let NweetTextRef = doc(dbService, COLLECTION_NAME, `${nweetObj.id}`);            
        await updateDoc(NweetTextRef,{text: newNweet,});
        console.log(newNweet)
        setEditing(false);
    
    }

    const onEditUpdate = (event) => {
        event.preventDefault();        
        const {target:{value}} = event;        
        setNewNweet(value);
    }

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onEditSubmit} className="container nweetEdit" >
                        <input type="text" autoFocus className="formInput" placeholder="Edit your nweet" onChange={onEditUpdate} value={newNweet} required />
                        <input type="submit" value="Update Nweet" className="formBtn"/>
                        <button type="button" className="formBtn cancelBtn" onClick={toggleEditing}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="profile" />}
                    {isOwner && (
                        <div class="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </ div>
                    )}
                </>
            )}
        </div>   
        )
}

export default Nweet;