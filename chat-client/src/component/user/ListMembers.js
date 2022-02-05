import { useSelector } from "react-redux"
import { online } from "../../socket_io/events";
import { ListMessages } from "../chatwindow";
import Member from "./Member";

const ListMembers = () => {
    const rooms = useSelector(state => state.room.listRoom);
    const currentRoom = useSelector(state => state.room.currentRoom);
    const listIdMembers = rooms.find((room)=>room._id === currentRoom)?.members;
    const users = useSelector(state => state.user.listUsers);
    const listMembers = users?.filter((user)=> listIdMembers?.some(id => id === user._id));
    
    return <div>
        {listMembers.map((member) => <Member key={member._id} isOnline={member.online} username={member.username} email={member.email} avatarUrl={member.avatar}/>)}
    </div>
}

export default ListMembers;