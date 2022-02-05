import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import socketEvent from "../../socket_io/events";
import { userApi } from '../../api';
import Member from '../user/Member';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(() => ({
    container: {
        padding: "10px",
        height: "80px"
    },
    normalInput: {
        height: "30px",
        width: "auto",
        alignItems: "center",
        "& .MuiInputBase-root": {
            height: "25px"
        },
        flexGrow: "1",
    },
    result: {
        display: "flex",
        alignItems: 'center'
    }
}))

const AddMember = ({ socket }) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [inviteUser, setInviteUser] = useState({
        disable: false,
        username: "",
        email: "",
        online: false,
        avatarUrl: ""
    });
    const currentRoom = useSelector(state => state.room.currentRoom);

    const handleInvite = () => {
        socket.emit(socketEvent.inviteMember,{email:inviteUser.email,room_id:currentRoom});
        setEmail("");
        setInviteUser({...inviteUser, disable: false});
    };

    const handleSearch = async (e) => {
        const em = e.target.value;
        setEmail(em);
        setInviteUser({...inviteUser, disable: false});
        if (em[em.length - 1] === '@' || e.key == 'Enter') {
            const user = await userApi.finduser({ email: em, room_id: currentRoom });
            setInviteUser({ disable: true, ...user });
        }
    }

    useEffect(() => {
        setInviteUser({...inviteUser, disable: false});
        setEmail("");
    }, [currentRoom])
    
    return (
        <div className={classes.container}>
            <div className={classes.normalInput}>
                <TextField
                    fullWidth variant="outlined"
                    placeholder="email"
                    value={email}
                    onChange={handleSearch}
                    onKeyDown={handleSearch}
                />
            </div>
            {inviteUser.disable && <div className={classes.result}>
                <Member username={inviteUser.username} email={inviteUser.email} avatarUrl={inviteUser.avatarUrl} isOnline={inviteUser.online} />
                {inviteUser.invite && <AddCircleOutlineIcon style={{ fontSize: "40px", color: "rgb(52, 86, 173)" }}
                    onClick={handleInvite}
                />}
            </div>}


        </div>
    );
}

export default AddMember;