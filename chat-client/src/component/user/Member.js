import React from "react";
import { makeStyles } from '@material-ui/core';
import { memo } from "react";
import AvatarUser from "./AvatarUser";

const useStyles = makeStyles(() => ({
    container: {
        paddingLeft: "15px",
        width: "395px",
        minHeight: "60px",
        display: "flex",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign:"left",
        lineHeight:"0.7"
    }
}))

const Member = ({ username = "", avatarUrl = "", isOnline = false ,email = ""}) => {
    const classes = useStyles();



    return <div className={classes.container}>
        <AvatarUser avatarUrl={avatarUrl} isOnline={isOnline} />
        <div>
            <p><b>{username}</b></p>
            <p style={{fontSize:"14px"}}><i>{email}</i></p>
        </div>
    </div>
}

export default memo(Member);