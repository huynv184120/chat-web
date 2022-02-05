import { mess_action_type } from "../actions/message"

const initState = {
    listMessages: []
};

const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case mess_action_type.addMessage: {
            const roomMessage = state.listMessages.find((oj) => action.data.to === oj.room_id);
            if (roomMessage) {
                if(roomMessage.messages[roomMessage.messages.length-1]._id !== action.data._id){
                    roomMessage.messages = [...roomMessage.messages, action.data];
                    state.listMessages = [...state.listMessages];
                }
            } else {
                state.listMessages = [...state.listMessages, { room_id: action.data.to, messages: [action.data] }]
            }
            return { ...state };
        }

        case mess_action_type.deleteMessage: {
            const roomMessage = state.listMessages.find((oj) => action.data.room._id === oj.room._id);
            if (roomMessage) {
                roomMessage.messages = roomMessage.messages.filter((mess) => mess._id !== action.data.message._id);
            }
            return { ...state };
        }
        case mess_action_type.loadMessages: {
            state.listMessages = [...state.listMessages, { room_id: action.data.room_id, messages: action.data.messages }];
            return { ...state };
        }
        default: {
            return state;
        }
    }
}

export default messageReducer;