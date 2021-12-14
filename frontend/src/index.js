import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducers/combineReducers";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { composeWithDevTools } from "redux-devtools-extension";


const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : [];
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const initialState = {
    cartReducer: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLoginReducer: { userInfo: userInfoFromStorage },
};
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
ReactDOM.render(
    <>
    <Provider store={store}>
        <App />
    </Provider>
    </>,
    document.getElementById("root")
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
