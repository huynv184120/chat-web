import './App.css';
import Auth from './component/auth';
import { makeStyles } from '@material-ui/core';
import { SearchRoom } from './component/room';
import ChatRoom from './component/chatwindow';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from "socket.io-client";
import config from './config';
import socketEvent from './socket_io/events';
import { joinRoom, loadRooms, updateLastMessage } from "./redux/actions/room";
import { addMessage, loadMessages } from './redux/actions/message';
import { roomApi, messageApi, userApi } from './api';
import { loadUsers , updateMemberInfo} from './redux/actions/user';
import { receiveInvitation, loadInvitations } from './redux/actions/announce';
import Invitations from './component/anncounce/Invitations';
import ChatAppBar from './component/ChatAppBar';

const useStyles = makeStyles(() => {
  return ({
    appBar: {
      height: "70px",
      display:"flex",
      alignItems:"center",
      paddingLeft:"30px",
      paddingRight:"30px",
      
    },
    "@global": {
      "*::-webkit-scrollbar": {
        width: "4px",
      },
      "*::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 2px rgba(0,0,0,0.00)"
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,0.05)",
        outline: "0.5px solid slategrey"
      }
    }
  })
})

const socket = io(config.END_POINT, { withCredentials: true });

const App = () => {
  const classes = useStyles();
  const auth = Cookies.get('token');
  const dispatch = useDispatch();



  useEffect(async () => {
    if (auth) {
      const res = await roomApi.getRooms();
      const rooms = res.data;
      dispatch(loadRooms(rooms));
      const listRoomMess = rooms.map((room)=>messageApi.getMessages(room._id));
      await Promise.all(listRoomMess);
      const users = res.users;
      dispatch(loadUsers(users));

      listRoomMess.forEach(element => {
        element.then((data)=>{
          dispatch(loadMessages(data));
          dispatch(updateLastMessage({room_id:data.room_id ,lastMessage:data.messages[data.messages.length - 1]}))
        })
      });

      const invitations = userApi.getinvitations();
      invitations.then((data)=>{
        dispatch(loadInvitations(data));
      }).catch(()=>{})

      

      socket.emit(socketEvent.online, { token: auth });

      socket.on(socketEvent.updateMemberInfo,(data)=>{
        dispatch(updateMemberInfo(data));
      });

      socket.on(socketEvent.joinRoom, (room) => {
        dispatch(joinRoom(room));
      });

      socket.on(socketEvent.addMessage, (message) => {
        dispatch(addMessage(message));
        dispatch(updateLastMessage({room_id:message.to ,lastMessage:message}));
      });

      socket.on(socketEvent.invite, (data) => {
        dispatch(receiveInvitation(data));
      });

    }


  }, [])



  return (
    <div className="App">
      {(!auth) && <Auth />}
      {auth && <div>
        <div className={classes.appBar}>
          <ChatAppBar/>
        </div>
        <div style={{ display: "flex" }}>
          <SearchRoom socket={socket} />
          <ChatRoom socket={socket} />
       </div>
      </div>}
    </div>
  );
}

export default App;
