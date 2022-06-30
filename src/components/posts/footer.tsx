import { FC } from "react";

const Footer:FC<any> = ({ caption, username }) => {
    return (
        <div className="post-user-info">
            <span className="username">{username}</span>
            <span>{caption}</span>
        </div>
    );
}

export default Footer;