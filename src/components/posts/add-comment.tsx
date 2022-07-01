import { FC, useState, useContext } from "react";
import FirebaseContext from "../../db/firebase.context";
import UserContext from "../../helpers/user.context";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";

interface Props {
    docId: string;
    comments: string[]; // Type 'string' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.ts(2802)
    setComments: ([]) => void;
    commentInput: string;
}

const AddComment:FC<Props> = ({ docId, comments, setComments, commentInput }) => {
    
    const [comment, setComment] = useState<string>('');
    const firebase: FirebaseApp | undefined = useContext<FirebaseApp | undefined>(FirebaseContext);
    
    // const {
    //     user: { displayName }
    // } = useContext(UserContext);
    const user: User | undefined = useContext<User | undefined>(UserContext);
    const displayName = user?.displayName;
    
    const handleSubmitComment = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        // console.log(comments);

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