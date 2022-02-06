import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { memo } from "react";
import ListMembers from "../user/ListMembers";
import AddMember from "../chatwindow/AddMember";
import { useSelector } from "react-redux";
import SettingsIcon from '@material-ui/icons/Settings';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
    roomSetting: {
        width: "420px",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
    },
    container: {
        height: "120px",
        width: "auto",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        display: "flex",
        alignItems:"center",
        justifyContent: "space-evenly"
    }
}))

const RoomManage = ({ socket }) => {
    const classes = useStyles();
    const currentRoom = useSelector(state => state.room.currentRoom);
    const rooms = useSelector(state => state.room.listRoom);
    const room = rooms.find((room) => room._id === currentRoom);
    const [edit, setEdit] = useState(true);

    return (
        <div className={classes.roomSetting}>
            <div className={classes.container}>
                {edit && <p style={{ fontSize: "30px" }}>{room.roomname}<SettingsIcon style={{ marginLeft: "10px", fontSize: "12px" }} onClick={() => { setEdit(false) }} /></p>}
                {!edit && <div>
                    <div><TextField id="outlined-basic" label="room name" variant="outlined" /></div>
                    <Button variant="contained" color="primary">
                        edit
                    </Button>
                </div>}
            </div>
            <AddMember socket={socket} />
            <div>
                <ListMembers />
            </div>

        </div>)
}

export default memo(RoomManage);