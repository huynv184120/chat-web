import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { memo } from "react";
import ListMembers from "../user/ListMembers";
import AddMember from "../chatwindow/AddMember";
import { useSelector } from "react-redux";
import SettingsIcon from '@material-ui/icons/Settings';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import socketEvent from "../../socket_io/events";

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
        alignItems: "center",
        justifyContent: "space-evenly"
    }
}))

const RoomManage = ({ socket }) => {
    const classes = useStyles();
    const currentRoom = useSelector(state => state.room.currentRoom);
    const rooms = useSelector(state => state.room.listRoom);
    const room = rooms.find((room) => room._id === currentRoom);
    const [edit, setEdit] = useState(true);
    const [roomInfo, setRoomInfo] = useState(
        {
            roomname: room.roomname,
            _id: currentRoom
        }
    );
    const changeRoomInfo = () => {
        if (room.roomname != roomInfo.roomname)
            socket.emit(socketEvent.updateRoomInfo, roomInfo);
        setEdit(true);
    }

    useEffect(() => {
        setRoomInfo({
            roomname: room.roomname,
            _id: currentRoom
        });
    }, [currentRoom]);
    

    return (
        <div className={classes.roomSetting}>
            <div className={classes.container}>
                {edit && <p style={{ fontSize: "30px" }}><b>{room.roomname}</b><SettingsIcon style={{ marginLeft: "10px", fontSize: "12px" }} onClick={() => { setEdit(false) }} /></p>}
                {!edit && <div>
                    <div><TextField id="outlined-basic" variant="outlined"
                        value={roomInfo.roomname}
                        onChange={(e) => { setRoomInfo({ ...roomInfo, roomname: e.target.value }) }}
                    />
                    </div>
                    <Button variant="contained" color="primary" onClick={changeRoomInfo}>
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