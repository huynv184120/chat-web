import axiosClient from "./axiosClient";

const authApi = {
    login: (data) => {
        const url = "/auth/login";
        return axiosClient.post(url, data, {withCredentials:true});
    },
    signup: (data) => {
        const url = "auth/signup";
        return axiosClient.post(url, data);
    },
    verify: (data) => {
        const url = "auth/verify";
        return axiosClient.post(url, data);
    }

}



export default authApi;