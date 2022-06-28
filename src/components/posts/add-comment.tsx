import { FC, useState, useContext } from "react";
import FirebaseContext from "../../db/firebase.context";
import UserContext from "../../helpers/user.context";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

const AddComment:FC<any> = ({ docId, comments, setComments, commentInput }) => {
    
    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    
    const {
        user: { displayName }
    } = useContext(UserContext);
    
    const handleSubmitComment = (event:any) => {
        event.preventDefault();
        
        setComments([{ displayName, comment }, ...comments ]);
        
        setComment('');
        
        const db = getFirestore(firebase);
        const photos = doc(db, "photos", docId);

        updateDoc(photos, {
            // TODO: Look into this. It seems to work but may cause some unexpected errors.
            comments: arrayUnion({ displayName, comment })
        });
    }

    return (
        <div className="comment-section-form">
            <form
                className="comment-form"
                onSubmit = {(event) =>
                    comment.length >= 3 ? handleSubmitComment(event) : event.preventDefault()
                }
                method="POST"
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                />
                <button 
                    className={`${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 3}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default AddComment;