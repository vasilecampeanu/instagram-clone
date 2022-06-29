import { FC } from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

const Sidebar:FC<any> = () => {
    const { 
        user: { fullName, username, userId } 
    } = useUser();
    
    return (
        <div>
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} />
        </div>
    );
}

export default Sidebar;