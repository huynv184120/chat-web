import React from "react";
import { makeStyles } from "@material-ui/core";
import { memo } from "react";
import ListMembers from "../user/ListMembers";
import AddMember from "./AddMember";
const useStyles = makeStyles(() => ({
    roomSetting: {
        width: "420px",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
    },
    container: {
        height:"180px",
        width:"auto",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
    }
}))

const RoomManage = ({socket}) => {
    const classes = useStyles()
    return (
        <div className={classes.roomSetting}>
            <div className={classes.container}>

            </div>
            <AddMember socket={socket}/>
            <div>
                <ListMembers/>
            </div>

        </div>)
}

export default memo(RoomManage);