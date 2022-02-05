import React, { useCallback } from "react";
import Room from "./Room";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch} from "react-redux";
import { selectCurrentRoom } from "../../redux/actions/room";

const useStyles = makeStyles(() => ({
    listRoomContainer: {
        width:"100%",
        overflowY: "auto",
        overflowX: "hidden",
        display:"flex",
        flexDirection:"column",
        height:"calc(100vh - 260px)",
        }
}))

const ListRoom = ({listRooms=[]}) => {
    const classes = useStyles();
    const currentRoom = useSelector(state => state.room.currentRoom);
    const dispatch = useDispatch();
    const selectRoom = useCallback(
        (_id) => {
            dispatch(selectCurrentRoom({_id}));
        }
    , []);

    return (
        <div className={classes.listRoomContainer}>
            {listRooms.map((room) =>{ return <Room key={room._id} _id={room._id} isCurrentRoom={room._id===currentRoom} roomName={room.roomname} avatarUrl={room.avatarUrl} lastMessage={room.lastMessage}  selectRoom={selectRoom}/>})}
        </div>)
}

export default ListRoom;