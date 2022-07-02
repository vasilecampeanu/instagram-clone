import { FC } from "react";

interface Props
{
    caption:string;
    username:string;
}

const Footer:FC<Props> = ({ caption, username }) => {
    return (
        <div className="post-user-info">
            <span className="username">{username}</span>
            <span>{caption}</span>
        </div>
    );
}

export default Footer;