import axiosClient from "./axiosClient";

const messageApi = {
    getMessages: (room_id) => {
        const url = "message/getmessages";
        return axiosClient.post(url, {_id:room_id});
    }
}
export default messageApi;