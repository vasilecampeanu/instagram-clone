import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import { FC } from 'react';

const Post:FC<any> = ({ content }) => {
    return (
        <article>
            <Image src={content.imageSrc} caption={content.caption} />
            <Footer username={content.username} caption={content.caption} />
        </article>
    )
}

export default Post;