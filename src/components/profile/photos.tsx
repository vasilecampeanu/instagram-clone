import { Console } from "console";
import { FC, Key } from "react";
import Skeleton from 'react-loading-skeleton';

const Photos:FC<any> = ({ photos }) => {
    return (
        <div className="gallery">
            <div className="gallery-inner-layer">
                {!photos ? (
                    <>
                        {[...new Array(9)].map((_, index) => (
                            <Skeleton key={index} count={1} width={320} height={400} />
                        ))}
                    </>
                ) : photos && photos.length > 0 ? (
                    photos && photos.map((photo: { docId: Key | null | undefined; imageSrc: string | undefined; caption: string | undefined; }) => (
                        <div key={photo.docId}>
                            <img src={photo.imageSrc} alt={photo.caption} />
                        </div>
                    ))
                ) : null}    
            </div>
            <div className="empty-gallery">
                {!photos || (photos && photos.length === 0 && <p>No Photos Yet</p>)}
            </div>
        </div>
    );
}

export default Photos;