import React from "react";
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from "@material-ui/core";
import { memo } from "react";

const useStyles = makeStyles(() => ({
    headerRoomChat: {
        height: "80px",
        minHeight: "80px",
        width: "100%",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        display: "flex",
        justifyContent: "space-between"
    },
    leftContainer: {
        height: "100%"
    },
    rightContainer: {
        width: "160px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        marginRight: "10px",
        justifyContent: "flex-end"
    }
}));

const HeaderRoomChat = ({setSetting}) => {
    const classes = useStyles();
    return (
        <div className={classes.headerRoomChat}>
            <div className={classes.leftContainer}>
            </div>
            <div className={classes.rightContainer}>
                <InfoIcon style={{ fontSize: "40px", color: "rgb(52, 86, 173)" }}  onClick={() => {setSetting((pre)=>(!pre))}}/>

            </div>
        </div>)
}

export default memo(HeaderRoomChat);