import { FC, memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export {}

const User:FC<any> = ({ username, fullName }) => {
    return (
        !username || !fullName ? (
            <Skeleton count={1} height={61} />
        ) : (
            <div className="sidebar-wrapper-user">
                <Link className="sidebar-user" to={`/profile/${username}`}>
                    <div className="user-photo">
                        <img
                            src={`assets/scrimba/avatars/${username}.jpg`}
                            alt="My profile"
                        />
                    </div>
                    <div className="user-details">
                        <p className="username">{username}</p>
                        <p className="full-name">{fullName}</p>
                    </div>
                </Link>
                <div className="user-action">
                    Switch user
                </div>
            </div>
        )
    )
}

export default User;