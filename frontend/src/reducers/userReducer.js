import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_FAIL,
    USER_UPDATE_PASSWORD_REQUEST,
    GET_USERS,
    DElETE_USER,
    UPDATE_USER
} from "../actions/types";

export function userLoginReducer(state = {}, action) {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGIN_LOGOUT:
            return { userInfo: action.payload };
        default:
            return state;
    }
}

export function userRegisterReducer(state = {}, action) {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export function userDetailsReducer(state = { user: {} }, action) {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case USER_DETAILS_RESET:
            return { user: {} };
        default:
            return state;
    }
}

export function userUpdateProfileReducer(state = {}, action) {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, user: action.payload, success: true };
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export function userUpdatePasswordReducer(state = {}, action) {
    switch (action.type) {
        case USER_UPDATE_PASSWORD_REQUEST:
            return { loading: true };
        case USER_UPDATE_PASSWORD_SUCCESS:
            return { loading: false, user: action.payload, success: true };
        case USER_UPDATE_PASSWORD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const usersReducer = (users = [], action)=>{
    const {type , payload} = action

    switch (type) {
        case GET_USERS:
            return payload
        
        case DElETE_USER:
            return users.filter(({id})=> id !== payload.id) 
        
        case UPDATE_USER:

            // return users.map((user) => {
            //     payload.id = parseInt(payload.id);
            //     return user.id !== payload.id ? user : Object.assign({}, payload);
            // });
            return users.map((user)=>{
                payload.id = parseInt(payload.id)
                if(user.id === payload.id){
                    return {
                        ...user,
                        ...payload,
                    };
                }else{
                    return user
                }
            });

        default:
            return users
    }

}