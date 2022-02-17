export const mess_action_type = {
    updateMessage:"UPDATE_MESSAGE",
    deleteMessage:"DELETE_MESSAGE",
    addMessage:"ADD_MESSAGE",
    loadMessages:"LOAD_MESSAGES"
};

export const updateMessage = (data) => {
    return {
        type: mess_action_type.updateMessage,
        data:data
    };
};

export const addMessage = (data) => {
    return {
        type: mess_action_type.addMessage,
        data: data
    };
};

export const deleteMessage = (data) => {
    return {
        type: mess_action_type.deleteMessage,
        data:data
    };
};

export const loadMessages = (data) => {
    return {
        type:mess_action_type.loadMessages,
        data:data
    }
};

