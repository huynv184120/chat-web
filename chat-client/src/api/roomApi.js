import axiosClient from "./axiosClient";

const roomApi = {
    getRooms: ()=>{
        const url="room/getrooms";
        return axiosClient.post(url, {});
    }
}

export default roomApi;