import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import useFollowedUsersPhotos from '../hooks/use-followed-users-photos';
import Post from './posts';

const Timeline:FC<any> = () => {
    const { photos } = useFollowedUsersPhotos();
    
    console.log(photos);

    return (
        <div className="timeline">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} width={320} height={400} />
                    ))}
                </>
            ) : photos && photos.length > 0 ? (
                photos.map((content:any) => 
                    <Post key={content.docId} content={content} />
                )
            ) : (
                <p className="text-center text-2xl">Follow people to see photos!</p>
            )}
        </div>
    );
}

export default Timeline;