import ProductService from "../services/productService";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "./types";

export const addToCart = (i, qty) => async (dispatch, getState) => {
    try {
        let res = await ProductService.getOne(i);
        res = res.data.data.data;
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                id: res.id,
                name: res.name,
                image: res.image,
                price: res.price,
                countInStock: res.countInStock,
                qty,
            },
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems));
    } catch (err) {
        console.log(err);
    }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id,
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems));
    } catch (err) {
        console.log(err);
    }
};

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};


export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
};