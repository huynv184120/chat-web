import React from "react";
import { Message } from "./message";
import { makeStyles } from "@material-ui/core";
import { memo } from "react";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';


const useStyles = makeStyles(() => ({
    messagesContainer: {
        height: "calc(100vh - 284px)",
        overflowY: "auto",
        overflowX: "hidend",
        marginTop: "20px",
        marginBottom: "20px",
        position: "relative"
    }
}))

const ListMessages = () => {
    const classes = useStyles();
    const listMessages = useSelector(state => state.message.listMessages)
    const currentRoom = useSelector(state => state.room.currentRoom);
    const currentRoomMess = (listMessages.filter((oj) => oj.room_id === currentRoom))[0]?.messages || [];
    const users = useSelector(state => state.user.listUsers);
    const self = Cookies.get('user_id').split('"')[1];
    for (let i = currentRoomMess.length - 1; i > 0; i=i-1) {
        if ((currentRoomMess[i].from !== self)) {
            currentRoomMess[i].notSelf = true;
            if (currentRoomMess[i].from !== currentRoomMess[i - 1].from) {
                currentRoomMess[i].user = users.find((user) => user._id === currentRoomMess[i].from)
            }
        }else{
            currentRoomMess[i].notSelf = false;            
        }

    }
    if ((currentRoomMess.length >=1) && (currentRoomMess[0].from !== self)) {
        currentRoomMess[0].user = users.find((user) => user._id === currentRoomMess[0].from);
        currentRoomMess[0].notSelf = true;

    }

    return (
        <div className={classes.messagesContainer}>
            {currentRoomMess.map((mess) => <Message key={mess._id} content={mess.content} user={mess.user} notSelf={mess.notSelf}/>)}
        </div>);
}

export default memo(ListMessages);