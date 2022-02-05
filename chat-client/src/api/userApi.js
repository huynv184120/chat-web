import axiosClient from "./axiosClient";

const userApi = {
    finduser : (data) => {
        const url = "user/finduser";
        return axiosClient.post(url, data);
    },
    getinvitations:() => {
        const url = "user/getinvitations";
        return axiosClient.post(url, {});
    }
}
export default userApi;