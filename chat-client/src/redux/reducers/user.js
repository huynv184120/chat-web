import { user_action_type } from "../actions/user";

const initState = {listUsers:[], myInfo:{}};

const userReducer = (state=initState, action)=>{
    switch(action.type){
        case user_action_type.loadUsers:{
            state.listUsers = action.data
            return {...state};
        }
        case user_action_type.updateMemberInfo:{
            action.data.forEach(member => {
                state.listUsers = state.listUsers.filter((user) => user._id !==  member._id);
                state.listUsers = [member, ...state.listUsers]
            });
            
            return {...state};
        }
        case user_action_type.loadMyInfo:{
            state.myInfo = action.data;
            return {...state};
        }
        default:return state
    }
}

export default userReducer;