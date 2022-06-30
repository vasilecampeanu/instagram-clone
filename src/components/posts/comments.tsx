import { FC, useState } from "react";
import AddComment from "./add-comment";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

const Comments:FC<any> = ({ docId, comments: allComments, posted, commentInput }) => {
    const [comments, setComments] = useState(allComments)
    return (
        <div className="post-comment-section">
            <div className="comment-list">
                {comments.length >= 3 && (
                    <p className="show-all">
                        View all {comments.length} comments
                    </p>
                )}
                {comments.slice(0, 3).map((item:any) => (
                    <p key={`${item.comment}-${item.displayName}`}>
                        <Link className="username-link" to={`/profile/${item.displayName}`}>
                            <span className="display-name">{item.displayName}</span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                <p className="post-date">
                    {formatDistance(posted, new Date())} ago
                </p>
            </div>
            <div className="add-comment-section">
                <AddComment
                    docId={docId}
                    comments={comments}
                    setComments={setComments}
                    commentInput={commentInput}
                />
            </div>
        </div>
    );
}

export default Comments;