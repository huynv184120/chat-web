import MoodIcon from '@material-ui/icons/Mood';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import socketEvent from '../../../socket_io/events';

const useStyles = makeStyles(() => ({
    listEmoji: {
        background:"rgb(237, 242, 240)",
        display: "flex",
        position: "absolute",
        height: "45px",
        width: "120px",
        borderRadius: "10px",
        top: "-50px",
        left: "-50px",
        zIndex:"1"
    },
    emojiButton: {
        position: "relative",
        height: "24px",
        "&:hover": {
            background: "rgba(189, 177, 153, 0.6)",
            borderRadius: "50%"
        },
        cursor:"pointer"
    },
    emoji: {
        fontSize: '30px', cursor: 'pointer'
    }
}))

const Reaction = ({socket, id}) => {
    const classes = useStyles();
    const [show, setShow] = useState(false);

    const reaction = (i) => {
        setShow(false);
        socket.emit(socketEvent.reactMessage, {reactType:i, message_id:id});
    }

    return (<div className={classes.emojiButton}>
        <MoodIcon style={{ color: "rgb(83, 99, 86, 0.7)" }} onClick={() => setShow(true)} />
        {show && <div className={classes.listEmoji}>
            <div className={classes.emoji} onClick={() => reaction(1)}>👍</div>
            <div className={classes.emoji} onClick={() => reaction(2)}>❤️</div>
            <div className={classes.emoji} onClick={() => reaction(3)}>😢</div>
        </div>}

    </div>)
}

export default Reaction;