import { room_action_type } from "../actions/room";

const initState = {
    currentRoom: null,
    listRoom: [],
}

const roomReducer = (state = initState, action) => {

    switch (action.type) {
        case room_action_type.changeRoomInfo: {
            let room = state.listRoom.find((room) => (action.data._id === room._id));
            if (room) {
                room = { ...room, ...action.data };
                state = { ...state, ...action.data };
            }
            return state;
        }
        case room_action_type.leaveRoom: {
            const rooms = state.listRoom.filter((room) => (action.data._id !== room._id));
            state.listRoom = rooms;
            return { ...state };
        }
        case room_action_type.joinRoom: {
            state.listRoom = [action.data, ...state.listRoom];
            return { ...state };
        }
        case room_action_type.selectCurrentRoom: {
            state.currentRoom = action.data._id;
            return { ...state };
        }
        case room_action_type.loadRooms: {
            state.listRoom = action.data;
            return { ...state };
        }
        case room_action_type.updateLastMessage: {
            const room = state.listRoom.find(room => room._id === action.data.room_id);
            room.lastMessage = action.data.lastMessage;
            state.listRoom = [...state.listRoom];
            state.listRoom.sort((a, b) => {
                const t1 = a.lastMessage ? Date.parse(a.lastMessage.createdAt) : 0;
                const t2 = b.lastMessage ? Date.parse(b.lastMessage.createdAt) : 0;
                return t2 - t1;
            });
            return { ...state };
        }
        default: {
            return state;
        }

    }
}


export default roomReducer;