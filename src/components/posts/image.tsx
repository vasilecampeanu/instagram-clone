import { FC } from "react";

const Image:FC<any> = ({ src, caption }) => {
    return (
        <div className="photo">
            <img src={src} alt={caption} />
        </div>
    )
}

export default Image;