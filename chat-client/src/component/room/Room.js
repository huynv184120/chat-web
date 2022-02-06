import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
    room : {
        width: "395px",
        minHeight:"80px",
        display: "flex",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius:  "7px",
        textAlign:"left",
        "&:hover" :{
            background:"rgba(189, 177, 153, 0.2)",
        },
        transition:"background 250ms"
    },
    currentRoom:{
        background:"rgba(200, 200, 200, 0.8)",
        width: "395px",
        minHeight:"80px",
        display: "flex",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius:  "7px",
        textAlign:"left",
        transition:"background 250ms"
    },
    roomContent : {
        marginLeft: "20px"
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
      },
}))

const Room = ({avatarUrl="", roomName="", lastMessage={}, isCurrentRoom=false ,_id="", selectRoom}) => {
    const classes = useStyles();
    return<div className={isCurrentRoom?classes.currentRoom:classes.room} onClick={() => {selectRoom(_id)}}>
        <Avatar src={avatarUrl} className={classes.large}/>
        <div className={classes.roomContent}>
            <p><b> {roomName} </b></p>
            <p>{lastMessage?.content}</p>
        </div>
    </div>
}

export default memo(Room);