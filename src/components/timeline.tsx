import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

const Timeline:FC<any> = () => {
    const photos:any = null;

    return (
        <div className="timeline">
            {!photos ? (
                <>
                    {[...new Array(4)].map((_, index) => (
                        <Skeleton key={index} count={1} width={320} height={400} />
                    ))}
                </>
            ) : photos && photos.length > 0 ? (
                photos.map((content:any) => <p>I will be a photo</p>)
            ) : (
                <p className="text-center text-2xl">Follow people to see photos!</p>
            )}
        </div>
    );
}

export default Timeline;