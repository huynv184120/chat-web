export const user_action_type ={
    loadUsers: "loadUsers",
    updateMemberInfo:"updateMemberInfo",
    loadMyInfo:"loadMyInfo"
};

export const loadUsers = (data) => {
    return {
        type: user_action_type.loadUsers,
        data: data
    }
}

export const updateMemberInfo = (data) => {
    return{
        type: user_action_type.updateMemberInfo,
        data:data
    }
}

export const loadMyInfo = (data) => {
    return{
        type: user_action_type.loadMyInfo,
        data:data
    }
}