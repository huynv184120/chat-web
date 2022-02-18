import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { memo } from "react";
import { useSelector } from "react-redux";
import socketEvent from "../../socket_io/events";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const useStyles = makeStyles(() => ({
    inputContainer: {
        height: "80px",
        width: "100%",
        minHeight: "80px",
        display: "flex",
        bottom: "0px",
    },
    otherInput: {
        height: "80px",
        width: "140px",
        float: "left",
        padding: "6px",
        display: "flex",
        justifyContent: "flex-end"
    },
    normalInput: {
        height: "80px",
        width: "auto",
        alignItems: "center",
        "& .MuiInputBase-root": {
        },
        float: "left",
        flexGrow: "1",

    },
    submitContainer: {
        width: "100px",
        height: "80px",
        paddingTop: "6px"
    }

}))


const InputMessages = ({ socket }) => {
    const initMess = {
        to: "",
        content: "",
    };
    const classes = useStyles();
    const currentRoom = useSelector(state => state.room.currentRoom);
    const [message, setMessage] = useState({ ...initMess });
    const [showEmoji, setShowEmoji] = useState(false)

    const sendMessage = () => {
        message.to = currentRoom;
        message.content = message.content.trim();
        const valid = message.content.length;
        if (valid)
            socket.emit(socketEvent.sendMessage, message);
        setMessage({ ...initMess });
    };
    const handleEmojiSelect = (e)=>{
        setMessage((message) => ({...message, content:(message.content+e.native)}));
    }


    return (
        <div className={classes.inputContainer}>
            <div className={classes.otherInput}>
                <PhotoLibraryIcon style={{ fontSize: "40px", color: "rgb(52, 86, 173)" }} />
            </div>
            <div className={classes.normalInput}>
                <TextField
                    fullWidth variant="outlined"
                    placeholder="Aa"
                    InputProps={{
                        endAdornment: <SentimentVerySatisfiedIcon style={{ fontSize: "40px", color: "rgb(52, 86, 173)" , cursor:"pointer"}} onClick={()=>{setShowEmoji(!showEmoji)}}/>
                    }}
                    value={message.content}
                    onChange={(e) => setMessage({ ...message, content: e.target.value })}
                    onKeyDown={(e) => { if (e.key == 'Enter') sendMessage(); }}
                />
                {showEmoji && (
                    <div style={{ position: "absolute", bottom: "80px", right: "12%", zIndex: "1" }}>
                        <Picker
                                onSelect={handleEmojiSelect}
                            emojiSize={20} />
                    </div>
                )}
            </div>
            <div className={classes.submitContainer}>
                <SendIcon style={{ fontSize: "40px", color: "rgb(52, 86, 173)" }} onClick={sendMessage} />
            </div>
        </div>);
}

export default memo(InputMessages);