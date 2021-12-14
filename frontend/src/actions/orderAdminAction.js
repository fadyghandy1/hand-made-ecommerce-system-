import OrderService from "../services/orderService";
import axios from "axios";
import { DATA_LOADED, SINGLE_ORDER, DELETE_ORDER, DATA_UPDATED } from "./types";

export const deleteOrder = (id) => async (dispatch, getState) => {
    try {
        const {
            userLoginReducer: { userInfo },
        } = getState();
        let { rootReducer } = getState();
        rootReducer.Data.data.data = rootReducer.Data.data.data.filter((val) => val.id !== id);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await OrderService.deleteOrder(id, config);
        dispatch({
            type: DELETE_ORDER,
            payload: rootReducer,
        });
    } catch (error) {
        console.log(error.response);
    }
};

export const getSingleOrder = (id) => async (dispatch, getState) => {
    try {
        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const res = await axios.get(`http://localhost:3000/api/v1/orders/${id}`, config);
        dispatch({
            type: SINGLE_ORDER,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const loadedData = () => async (dispatch, getState) => {
    try {
        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        let res = await OrderService.getAllOrders(config);
        res.data.data.data = res.data.data.data.map((order) => {
            order.createdAt = new Date(order.createdAt).toLocaleDateString();
            return order;
        });
        dispatch({
            type: DATA_LOADED,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateOrder = (id, status) => async (dispatch, getState) => {
    try {
        const {
            userLoginReducer: { userInfo },
        } = getState();

        let {
            rootReducer: { singleOrderData },
        } = getState();
        singleOrderData.status = status;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await OrderService.editOrder(id, { status: status }, config);

        dispatch({
            type: DATA_UPDATED,
            payload: singleOrderData,
        });
    } catch (error) {
        console.log(error);
    }
};
