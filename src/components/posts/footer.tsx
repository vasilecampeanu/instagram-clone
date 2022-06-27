import { FC } from "react";

const Footer:FC<any> = ({ caption, username }) => {
    return (
        <div className="post-footer">
            <span>{username}</span>
            <span>{caption}</span>
        </div>
    );
}

export default Footer;