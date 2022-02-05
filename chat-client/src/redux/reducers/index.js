import {combineReducers} from "redux";
import roomReducer from "./room";
import messageReducer from "./message";
import userReducer from "./user";
import announceReducer from "./announce";

const rootReducer = combineReducers({
    room: roomReducer,
    message: messageReducer,
    user:userReducer,
    announce:announceReducer
});

export default rootReducer;