import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(() => ({
    container: {
        width: "420px",
        overflowY: "auto",
        overflowX: "hidden",
        background: "",
    },
    info: {
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        padding: "10px",
        display: "flex"
    },
    symbol: {
        position: "absolute",
        left: "40vw",
        top: "12px",
        display: "flex"
    }
}));

const Notification = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>

        </div>
    )
}



export const SymbolNotification = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (<div className={classes.symbol}>
        <NotificationsIcon style={{ fontSize: "50px", color: "rgb(52, 86, 173)" , borderRadius:"10px" , boder:"solid", background:"rgb(209, 224, 213)" }} onClick={() => { setOpen(true) }} />
        <Drawer anchor="right" open={open} onClose={() => { setOpen(false) }}>
            <div>
                <Notification/>
            </div>
        </Drawer>
    </div>)
}

export default Notification;