import { user_action_type } from "../actions/user";

const initState = {listUsers:[]};

const userReducer = (state=initState, action)=>{
    switch(action.type){
        case user_action_type.loadUsers:{
            state.listUsers = action.data
            return {...state};
        }
        case user_action_type.updateMemberInfo:{
            state.listUsers = state.listUsers.filter((user) => user._id !== action.data._id);
            state.listUsers = [action.data, ...state.listUsers]
            return {...state};
        }
        default:return state
    }
}

export default userReducer;