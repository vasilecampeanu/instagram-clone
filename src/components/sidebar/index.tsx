import { FC } from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

const Sidebar: FC<{}> = () => {
    const { 
        user: { fullName, username, userId } 
    } = useUser();
    
    return (
        <div className="sidebar-wrapper">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} />
        </div>
    );
}

export default Sidebar;