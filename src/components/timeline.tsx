import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUsersPhotos from '../hooks/use-followed-users-photos';
import Post from './posts';

const Timeline:FC<{}> = () => {
    const { photos } = useFollowedUsersPhotos();
    
    console.log(photos);

    return (
        <div className="timeline-wrapper">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} width={320} height={400} />
                    ))}
                </>
            ) : photos && photos.length > 0 ? (
                photos.map((content) => 
                    <Post key={content.docId} content={content} />
                )
            ) : (
                <p className="no-followers">Follow people to see photos!</p>
            )}
        </div>
    );
}

export default Timeline;