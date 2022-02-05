export const announce_action_type = {
    receiveInvitation:"RECEIVE_INVITATION",
    removeInvitation:"REMOVE_INVITATION",
    loadInvitations:"LOAD_INVITATIONS"
};

export const receiveInvitation = (data) => {
    return {
        type:announce_action_type.receiveInvitation,
        data:data
    }
};

export const removeInvitation = (data) => {
    return {
        type:announce_action_type.removeInvitation,
        data:data
    }
};

export const loadInvitations = (data) => {
    return {
        type:announce_action_type.loadInvitations,
        data:data
    }
}
