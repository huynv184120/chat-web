import React from "react";

import { makeStyles } from "@material-ui/core";
import { memo } from "react";
import Member from "../../user/Member";

const useStyles = makeStyles(() => ({
    selfMessage: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        margin: "2px",
        marginRight: "30px",

    },
    otherMessage: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        margin: "2px",
        marginLeft: "40px",
    },
    contentMessage: {
        maxWidth: "calc(40vw)",
        height: "auto",
        background: "rgb(23, 67, 189, 0.9)",
        borderRadius: "10px",
        padding: "5px",
        wordWrap: "break-word",
        textAlign: "left",
        color:"white",
        fontSize:"18px"
    }, contentMessage1: {
        maxWidth: "calc(40vw)",
        height: "auto",
        background: "rgb(190, 191, 184, 0.6)",
        borderRadius: "10px",
        padding: "5px",
        wordWrap: "break-word",
        textAlign: "left",
        fontSize:"18px"

    },

}))

const Message = ({ notSelf, user, content }) => {
    const classes = useStyles();
    return (
        <div>
            {notSelf && user && <Member avatarUrl={user.avatar} isOnline={user.online} username={user.username}/>}
            {notSelf &&
                <div className={classes.otherMessage}>
                    <div className={classes.contentMessage1}>
                        {content}
                    </div>
                </div>}
            {!notSelf && <div className={classes.selfMessage}>
                <div className={classes.contentMessage}>
                    {content}
                </div>
            </div>}
        </div>)
}

export default memo(Message);