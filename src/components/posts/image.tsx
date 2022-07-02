import { FC } from "react";

interface Props {
    src:string;
    caption:string;
}

const Image:FC<Props> = ({ src, caption }) => {
    return (
        <div className="photo">
            <img src={src} alt={caption} />
        </div>
    )
}

export default Image;