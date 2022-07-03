import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import { FC, useRef } from 'react';

interface Props {
    content: any;
}

const Post:FC<Props> = ({ content }) => {
    const commentInput: any | null = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    
    console.log(content.imageSrc);

    return (
        <article className='article-post'>
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <footer>
                <Actions
                    docId={content.docId}
                    totalLikes={content.likes.length}
                    likedPhoto={content.userLikedPhoto}
                    handleFocus={handleFocus}
                />
                <Footer username={content.username} caption={content.caption} />
                <Comments
                    docId={content.docId}
                    comments={content.comments}
                    posted={content.dateCreated}
                    commentInput={commentInput}
                />
            </footer>
        </article>
    )
}

export default Post;