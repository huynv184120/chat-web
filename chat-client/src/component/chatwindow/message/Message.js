import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import { memo } from "react";
import Member from "../../user/Member";
import Reaction from "./Reaction";
import DeleteIcon from '@material-ui/icons/Delete';
import socketEvent from "../../../socket_io/events";

const useStyles = makeStyles(() => ({
    selfMessage: {
        display: "flex",
        margin: "4px",
        marginRight: "30px",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    otherMessage: {
        display: "flex",
        margin: "4px",
        marginLeft: "40px",
        flexDirection: "row",
        alignItems: "center"
    },
    contentMessage: {
        maxWidth: "calc(30vw)",
        height: "auto",
        marginLeft: "10px",
        background: "rgb(23, 67, 189, 0.9)",
        borderRadius: "20px",
        padding: "5px",
        wordWrap: "break-word",
        textAlign: "left",
        color: "white",
        fontSize: "18px",
        marginBottom: "10px",
        position: "relative"
    }, contentMessage1: {
        maxWidth: "calc(30vw)",
        height: "auto",
        marginRight: "10px",
        background: "rgb(190, 191, 184, 0.6)",
        borderRadius: "20px",
        padding: "5px",
        wordWrap: "break-word",
        textAlign: "left",
        fontSize: "18px",
        marginBottom: "10px",
        position: "relative"
    }, listEmoji: {
        background: "rgb(237, 242, 240)",
        display: "flex",
        position: "absolute",
        height: "20px",
        width: "auto",
        borderRadius: "10px",
        bottom: "-13px",
        right: "0px",
    }, emoji: {
        fontSize: '15px', cursor: 'pointer'
    }, numberEmoji: {
        fontSize: '15px',
        color: "black"
    }, time: {
        position: "absolute",
        borderRadius: "5px",
        background: "rgb(81, 84, 89, 0.8)",
        color: "rgb(216, 221, 230)",
        right: "-50px",
        transform: "translate(100%)",
        top: "-1px",
        zIndex: "99",
        display: "block",
        minWidth: "190px"
    }, time1: {
        position: "absolute",
        borderRadius: "5px",
        background: "rgb(81, 84, 89, 0.8)",
        color: "rgb(216, 221, 230)",
        left: "-60px",
        transform: "translate(-100%)",
        top: "-1px",
        zIndex: "99",
        display: "block",
        minWidth: "190px"
    }, deleteButton: {
        "&:hover": {
            color: "rgb(53, 56, 54)",
            background: "rgba(189, 177, 153, 0.6)",
            borderRadius: "50%"
        },
        cursor: "pointer",
        color: "rgb(83, 99, 86, 0.7)"
    }


}))

const Message = ({ notSelf, id, user, content, reactions, createdAt, deleted, socket }) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const listEmoji = () => {
        const type_1 = reactions.filter((reaction) => reaction.type === 1);
        const type_2 = reactions.filter((reaction) => reaction.type === 2);
        const type_3 = reactions.filter((reaction) => reaction.type === 3);
        const number = reactions.length;
        return <div className={classes.listEmoji}>
            {(type_1.length !== 0) && <div className={classes.emoji} >👍</div>}
            {(type_2.length !== 0) && <div className={classes.emoji} >❤️</div>}
            {(type_3.length !== 0) && <div className={classes.emoji} >😢</div>}
            {(number > 1) && <div className={classes.numberEmoji} >{number}</div>}
        </div>
    }

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleString('en-US');
    }

    const handleDeleteMessage = () => {
        setShow(false);
        socket.emit(socketEvent.deleteMessage, { message_id: id });
    }

    return (
        <div>
            {!deleted && <div onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}>
                {notSelf && user && <Member avatarUrl={user.avatar} isOnline={user.online} username={user.username} />}
                {notSelf &&
                    <div className={classes.otherMessage}>
                        <div className={classes.contentMessage1} onMouseEnter={() => setShowTime(true)}
                            onMouseLeave={() => setShowTime(false)}>
                            {listEmoji()}
                            {content}
                            {showTime && <div className={classes.time}> {formatTime(createdAt)} </div>}
                        </div>
                        {show && <Reaction socket={socket} id={id} />}
                    </div>}
                {!notSelf && <div className={classes.selfMessage}>
                    {show && <DeleteIcon className={classes.deleteButton} onClick={handleDeleteMessage} />}
                    {show && <Reaction socket={socket} id={id} />}
                    <div className={classes.contentMessage} onMouseEnter={() => setShowTime(true)}
                        onMouseLeave={() => setShowTime(false)}>
                        {listEmoji()}
                        {content}
                        {showTime && <div className={classes.time1}> {formatTime(createdAt)} </div>}
                    </div>
                </div>}


            </div>}
            {deleted && <div>
                {notSelf && user && <Member avatarUrl={user.avatar} isOnline={user.online} username={user.username} />}
                {notSelf &&
                    <div className={classes.otherMessage}>
                        <div className={classes.contentMessage1} style={{color:"rgb(117,115,110)", background:"white", border:"solid 0.1px"}}>
                            this message had been deleted.
                        </div>
                    </div>}
                {!notSelf && <div className={classes.selfMessage}>
                    <div  className={classes.contentMessage} style={{color:"rgb(117,115,110)", background:"white",  border:"solid 0.1px"}}>
                        this message had been deleted.
                    </div>
                </div>}


            </div>}
        </div>)
}

export default memo(Message);