import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import { memo } from "react";
import Member from "../../user/Member";
import Reaction from "./Reaction";

const useStyles = makeStyles(() => ({
    selfMessage: {
        display: "flex",
        alignItems: "flex-end",
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
        maxWidth: "calc(40vw)",
        height: "auto",
        marginLeft: "10px",
        background: "rgb(23, 67, 189, 0.9)",
        borderRadius: "10px",
        padding: "5px",
        wordWrap: "break-word",
        textAlign: "left",
        color: "white",
        fontSize: "18px",
        position: "relative",
        marginBottom: "10px"
    }, contentMessage1: {
        maxWidth: "calc(40vw)",
        height: "auto",
        marginRight: "10px",
        background: "rgb(190, 191, 184, 0.6)",
        borderRadius: "10px",
        padding: "5px",
        wordWrap: "break-word",
        textAlign: "left",
        fontSize: "18px",
        position: "relative",
        marginBottom: "10px"

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
    }

}))

const Message = ({ notSelf, id, user, content, reactions, socket }) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const listEmoji = () => {
        const type_1 = reactions.filter((reaction) => reaction.type == 1);
        const type_2 = reactions.filter((reaction) => reaction.type == 2);
        const type_3 = reactions.filter((reaction) => reaction.type == 3);
        const number = reactions.length;
        return <div className={classes.listEmoji}>
            {(type_1.length !== 0) && <div className={classes.emoji} >👍</div>}
            {(type_2.length !== 0) && <div className={classes.emoji} >❤️</div>}
            {(type_3.length !== 0) && <div className={classes.emoji} >😢</div>}
            {(number > 1) && <div className={classes.numberEmoji} >{number}</div>}
        </div>
    }

    return (
        <div onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}>
            {notSelf && user && <Member avatarUrl={user.avatar} isOnline={user.online} username={user.username} />}
            {notSelf &&
                <div className={classes.otherMessage}>
                    {show && <Reaction socket={socket} id={id} />}
                    <div className={classes.contentMessage1}>
                        {listEmoji()}
                        {content}
                    </div>
                </div>}
            {!notSelf && <div className={classes.selfMessage}>
                {show && <Reaction socket={socket} id={id} />}
                <div className={classes.contentMessage}>
                    {listEmoji()}
                    {content}
                </div>
            </div>}
        </div>)
}

export default memo(Message);