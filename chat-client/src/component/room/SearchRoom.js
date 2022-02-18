import React, { useEffect } from "react";
import ListRoom from "./ListRoom";
import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import socketEvent from "../../socket_io/events";

const useStyles = makeStyles(() => ({
    search: {
        display: "flex",
        alignItems: "stretch",
        height: "60px",
        marginTop: "20px",
        "& input": {
            marginLeft: "5px",
            width: "100%",
            height: "32px",
            borderRadius: "12px",
            border: "0px",
            paddingLeft: "10px",
            fontSize: "20px",
            background: "rgba(168, 153, 151, 0.2)"
        }
    },
    headerSide: {
        height: "80px",
        minHeight: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    sideMenu: {
        width: "400px",
        minWidth: "100px",
        height: "auto",
        padding: "5px",
        border: "solid 0.1px rgba(186, 172, 171, 0.6)",
        "& ::-webkit-scrollbar": {
            display: "none"
        },
        "&:hover": {
            "& ::-webkit-scrollbar": {
                display: "flex"
            }
        }
    }
}))

const SearchRoom = ({ socket=null }) => {
    const classes = useStyles();
    const [isSearch, setIsSearch] = useState(false);
    const [result, setResult] = useState([]);
    const listRoom = useSelector(state => state.room.listRoom);
    
    
    const handleSearch = useCallback(() => {
        setIsSearch(true);
    }, []);

    const handleResult = (e) => {
        setResult(listRoom.filter((room) => room.roomname.includes(e.target.value)));
    };

    const handleCreateRoom = useCallback(() => {
        socket.emit(socketEvent.createRoom, {});
    }, []);



    return (
        <div className={classes.sideMenu}>
            <div className={classes.headerSide}>
                <div>
                    <p style={{ fontSize: 30, fontWeight: "bold", marginLeft:"5px" }}> Chat</p>
                </div>
                <div style={{ background: "rgba(186, 172, 171, 0.6)", borderRadius: "100%",width:"40px" , cursor:"pointer"}}>
                    <AddIcon style={{ fontSize: 35 }} onClick={handleCreateRoom} />
                </div>

            </div>
            <div className={classes.search}>
                {isSearch && <ArrowBackIcon style={{ fontSize: 32 }} onClick={() => { setIsSearch(!isSearch) }} />}
                <input placeholder="Search" onClick={handleSearch} onChange={handleResult} />
            </div>
            <ListRoom listRooms={isSearch ? result : listRoom} />
        </div>


    )
}

export default SearchRoom;