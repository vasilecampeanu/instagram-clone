import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    username: string
}

const Header:FC<Props> = ({ username }) => {
    return (
        <div className="post-header">
            <div className="post-header-inner-wrapper">
                <div className="profile-photo">
                    <img
                        className="rounded-full h-8 w-8 flex"
                        src={`/assets/scrimba/avatars/${username}.jpg`}
                        alt={`${username} profile picture`}
                    />
                </div>
                <div className="username">
                    <Link className="profile-photo" to={`/profile/${username}`}>{username}</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;