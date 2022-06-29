import { FC, memo } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export {}

const User:FC<any> = ({ username, fullName }) => {
    return (
        !username || !fullName ? (
            <Skeleton count={1} height={61} />
        ) : (
            <Link to={`/profile/${username}`}>
                <div>
                    <img
                        src={`assets/scrimba/avatars/${username}.jpg`}
                        alt="My profile"
                    />
                </div>
                <div>
                    <p>{username}</p>
                    <p>{fullName}</p>
                </div>
            </Link>
        )
    )
}

export default User;