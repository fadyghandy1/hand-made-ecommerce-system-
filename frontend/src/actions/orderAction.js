import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
} from "../actions/types";
import { logout } from "./userAction";
import OrderService from "../services/orderService";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST,
        });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        let { data } = await OrderService.createOrder(order, config);
        data = data.data.data;
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        let { data } = await OrderService.getOrder(id, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
    }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        let { data } = await OrderService.payOrder(orderId, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        });
    } catch (err) {
        const message = err.response && err.response.data.message ? err.response.data.message : err.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        });
    }
};



export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST,
        });

        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        let { data } = await OrderService.getMyOrders(userInfo.data.user.id , config);
        data = data.data.data
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data,
        });
    } catch (err) {
        const message = err.response && err.response.data.message ? err.response.data.message : err.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: message,
        });
    }
};
