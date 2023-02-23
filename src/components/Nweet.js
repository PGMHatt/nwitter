import { dbService } from "myFirebase";
import React, {useState} from "react"
import { COLLECTION_NAME } from "routes/Home";
import { doc, deleteDoc, updateDoc }from"firebase/firestore";


const Nweet = ({nweetObj, isOwner}) => {
    
    const onDeleteClick = async () =>{
        const ok = window.confirm("Ard you sure you want to delete this nweet?")        
        console.log("ok?", ok);
        if(ok){
            //delete nweet
            const NweetTextRef = doc(dbService, COLLECTION_NAME, `${nweetObj.id}`);
            await deleteDoc(NweetTextRef);
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
        <div>
            {editing ? (
                <>
                    <form onSubmit={onEditSubmit}>
                        <input type="text" placeholder="Edit your nweet" onChange={onEditUpdate} value={newNweet} required />
                        <input type="submit" value="Update Nweet" />
                        <button type="button" onClick={toggleEditing}>Cancel</button>
                    </form>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                        {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>   
        )
}

export default Nweet;