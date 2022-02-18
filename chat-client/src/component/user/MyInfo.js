import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        width: "420px",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        background: "",
        position: "relative"
    },
    info: {
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        padding: "10px",
        display: "flex"
    },
    symbol: {
        position: "absolute",
        left: "60vw",
        top: "12px",
        display: "flex"
    },
    logout: {
        position: "absolute",
        top: "12px",
        right: "12px",
        display: "flex"
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
      },
}));




const MyInfo = () => {
    const classes = useStyles();
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    }
    const myinfo = useSelector(state => state.user.myInfo);

    return (
        <div className={classes.container}>
            <div className={classes.logout}>
                <ExitToAppIcon style={{ fontSize: "40px" }} onClick={handleLogout} />
            </div>
            <div style={{margin:"auto", display:"flex", flexDirection:"column", alignItems:"center", marginTop:"20vh"}}>
                <Avatar className={classes.large}/>
                <p><b>email: </b> <i> {myinfo.email}</i></p>
                <p><b>username: </b> <i> {myinfo.username}</i></p>
            </div>
        </div>
    )
}



export const SymbolMyInfo = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (<div className={classes.symbol}>
        <PermIdentityIcon style={{ fontSize: "50px", color: "rgb(52, 86, 173)", borderRadius: "10px", boder: "solid", background: "rgb(209, 224, 213)" , cursor:"pointer"}} onClick={() => { setOpen(true) }} />
        <Drawer anchor="right" open={open} onClose={() => { setOpen(false) }}>
            <div>
                <MyInfo />
            </div>
        </Drawer>
    </div>)
}

export default MyInfo;