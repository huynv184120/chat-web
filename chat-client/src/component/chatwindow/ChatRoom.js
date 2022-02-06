import { HeaderRoomChat, ListMessages, InputMessage } from '.';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { RoomManage } from '../room';

const useStyles = makeStyles(() => ({
    container:{
        display:"flex",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        position:"relative",
        flexGrow:"1",
    },
    chatRoom: {
        minWidth: "468px",
        width:"auto",
        position: "relative",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        flexGrow:"1"
    }
}))


const ChatRoom = ({socket}) => {
    const classes = useStyles();
    const [manage, setManage] = useState(false)

    const currentRoom = useSelector(state => state.room.currentRoom);



    return (
        <div className={classes.container}>
           {currentRoom&&<div className={classes.chatRoom}>
                <HeaderRoomChat setSetting={setManage}/>
                <ListMessages />
                <InputMessage socket={socket}/>
            </div>}
            {manage && <RoomManage socket={socket}/>}
            
        </div>
    );
};

export default memo(ChatRoom);
