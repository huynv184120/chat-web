import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';
import { memo } from "react";

const useStyles = makeStyles((theme) => ({
    avatarContainer:{
        position:"relative",
        display:"inline-block",
        marginRight:"10px",
        margin:"5px"
    },
    online:{
        position:"absolute",
        width:"8px",
        height:"8px",
        borderRadius:"8px",
        background: "rgb(39, 227, 54)",
        bottom:"4px",
        right:"4px"

    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
      },

}))

const AvatarUser = ({avatarUrl="", isOnline=false}) => {
    const classes = useStyles();

    return <div className={classes.avatarContainer}>
        <Avatar src={avatarUrl} className={classes.large}/>
        {isOnline&&<div className={classes.online}></div>}
    </div>
}

export default memo(AvatarUser);