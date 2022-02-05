import { announce_action_type } from "../actions/announce";

const initState = {
    listInvitation : [],
}

const announceReducer = (state=initState, action) => {
    switch(action.type){
        case announce_action_type.receiveInvitation:{
            state.listInvitation = [action.data, ...state.listInvitation];
            return {...state};
        }
        case announce_action_type.removeInvitation:{
            state.listInvitation = state.listInvitation.filter((inv) => inv.room_id !== action.data.room_id);
            return {...state};
        }
        default:return{...state};
    }

}

export default announceReducer;