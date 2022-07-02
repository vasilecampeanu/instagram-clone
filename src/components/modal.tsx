import React, { FC, useState } from 'react';

interface Props {
    show: boolean;
    onClose: () => void
}

const Modal:FC<Props> = ({ show, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);

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
                            <button>Post</button>
                        </div>
                    ) : (
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event:any) => {
                                console.log(event.target.files[0]);
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