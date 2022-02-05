import axios from 'axios';
import queryString from 'query-string';
import config from '../config';
import Cookies from 'js-cookie';
const token = Cookies.get('token');



const axiosClient = axios.create({
    baseURL: config.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
        'token':token
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    return config;
})
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});
export default axiosClient;
