import http from "../utils/http";

const login = ({ email, password }, config) => {
    return http.post(`/users/login`, { email, password }, config);
};

const signup = ({ name, email, password, passwordConfirm }, config) => {
    return http.post(
        `/users/signup`,
        { name, email, password, passwordConfirm },
        config
    );
};

const getMe = (config) => {
    return http.get(`/users/me`, config);
};

const updateMe = (data, config) => {
    return http.patch(`/users/updateMe`, data, config);
};

const updateMyPassword = (data, config) => {
    return http.patch(`/users/updateMyPassword`, data, config);
};

const getAllUasersApi = (config) =>{
    return http.get(`/users`,config)
}

const deleteUserApi = (id,config)=>{
    return http.delete(`/users/${id}`,config)
}

const getUserApi = (id,config)=>{
    return http.get(`/users/${id}`,config)
}
const updateUserApi = (id,data,config)=>{

    return http.patch(`/users/${id}`,data,config)
}
const UserService = {
    login,
    signup,
    getMe,
    updateMe,
    updateMyPassword,
    getAllUasersApi,
    deleteUserApi,
    getUserApi,
    updateUserApi
};

export default UserService;
