import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Drawer from '@material-ui/core/Drawer';
import socketEvent from '../../socket_io/events';
import { useDispatch } from 'react-redux';
import { removeInvitation } from '../../redux/actions/announce';

const useStyles = makeStyles(() => ({
    container: {
        width: "420px",
        overflowY: "auto",
        overflowX: "hidden",
        background: "",

    },
    invitation: {
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        padding: "10px",
        display: "flex"
    },
    symbol: {
        position: "absolute",
        left: "50vw",
        top: "12px",
        display: "flex"
    }
}));

const Invitation = ({ email, roomname, room_id, socket }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const acceptInvitation = () => {
        socket.emit(socketEvent.acceptJoinRoom, { room_id, accept: true });
        dispatch(removeInvitation({ room_id }));
    }
    const rejectInvitation = () => {
        socket.emit(socketEvent.acceptJoinRoom, { room_id, accept: false });
        dispatch(removeInvitation({ room_id }));
    }

    return (
        <div className={classes.invitation}>
            <p><b>{email}</b> invites you join <b>{roomname}</b></p>
            <ButtonGroup disableElevation variant="contained" color="primary" style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                <Button size="small" style={{ height: "20px" }} onClick={acceptInvitation}>accept</Button>
                <Button size="small" style={{ background: "rgb(171, 17, 32)", height: "20px" }} onClick={rejectInvitation}>remove</Button>
            </ButtonGroup>
        </div>
    )
}

const Invitations = ({ socket }) => {
    const classes = useStyles();
    const listInvitation = useSelector(state => state.announce.listInvitation);
    return (
        <div className={classes.container}>
            {listInvitation.map((inv, index) => <Invitation key={index} email={inv.from} roomname={inv.roomname} room_id={inv.room_id} socket={socket} />)}
        </div>
    )
}

export const SymbolInvtation = ({ socket }) => {
    const classes = useStyles();
    const listInvitation = useSelector(state => state.announce.listInvitation);
    const [open, setOpen] = useState(false);

    return (<div className={classes.symbol}>
        <PeopleOutlineIcon style={{ fontSize: "50px", color: "rgb(52, 86, 173)" , borderRadius:"10px" , boder:"solid", background:"rgb(209, 224, 213)" , cursor:"pointer"}} onClick={() => {setOpen(true)}} />
        <div style={{ color: "white", background: "rgb(158, 11, 11)", minWidth: "20px", height: "24px", borderRadius: "3px" }}>
            <b>
                {listInvitation.length}
            </b>
        </div>
        <Drawer anchor="right" open={open} onClose={() => { setOpen(false) }}>
            {!listInvitation.length&&<div style={{fontSize:"40px", color:"rgb(71, 77, 73)", margin:"auto"}}>No invites</div>}
            <div>
                <Invitations socket={socket} />
            </div>
        </Drawer>
    </div>)
}

export default Invitations;