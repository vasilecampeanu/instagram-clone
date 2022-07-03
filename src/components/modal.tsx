import { User } from 'firebase/auth';
import React, { FC, useContext, useState, useId } from 'react';
import UserContext from '../helpers/user.context';
import { createPost } from '../db/firebase.api';
import { FirebaseApp } from 'firebase/app';
import FirebaseContext from '../db/firebase.context';

interface Props {
    show: boolean;
    onClose: () => void
}

const Modal:FC<Props> = ({ show, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const firebase: FirebaseApp | undefined = useContext<FirebaseApp | undefined>(FirebaseContext);
    
    const user: User | undefined = useContext<User | undefined>(UserContext);
    const userId:string | undefined = user?.uid;
    const photoId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
    
    console.log(userId);

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <button onClick={onClose} className="btnClose">Close</button>
            <div className="modal-content">
                <div className="modal-header">
                    Create new post
                </div>
                <div className="modal-body">
                    {selectedImage ? (
                        <div>
                            <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <button onClick={()=>setSelectedImage(null)}>Remove</button>
                            <button onClick={() => {
                                createPost(firebase, userId, photoId, imageName).then(onClose);
                            }}>Post</button>
                        </div>
                    ) : (
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event:any) => {
                                console.log(event.target.files[0]);
                                console.log(event.target.files[0].name);
                                setImageName(event.target.files[0].name);
                                console.log(URL.createObjectURL(event.target.files[0]));
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal;