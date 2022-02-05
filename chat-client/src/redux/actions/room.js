
export const room_action_type = {
    changeRoomInfo:"CHANGE_ROOM_INFO",
    leaveRoom:"DELETE_ROOM",
    joinRoom:"JOIN_ROOM",
    selectCurrentRoom:"SELECT_CURRENT_ROOM",
    loadRooms:"LOAD_ROOMS",
    updateLastMessage:"UPDATE_LAST_MESSAGE"
}


export const changeRoomInfo = (data) =>{
    return{
        type: room_action_type.changeRoomInfo,
        data: data
    }
}

export const leaveRoom = (data) => {
    return{
        type: room_action_type.leaveRoom,
        data: data
    }
}

export const joinRoom = (data) => {
    return{
        type: room_action_type.joinRoom,
        data:data
    }
}

export const selectCurrentRoom = (data) => {
    return{
        type:room_action_type.selectCurrentRoom,
        data:data
    }
}

export const loadRooms = (data) => {
    return{
        type:room_action_type.loadRooms,
        data:data
    }
}

export const updateLastMessage = (data) => {
    return{
        type:room_action_type.updateLastMessage,
        data:data
    }
}