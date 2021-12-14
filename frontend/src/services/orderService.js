import http from "../utils/http";

const createOrder = (order, config) => {
    return http.post(`/orders`, order, config);
};

const getOrder = (id, config) => {
    return http.get(`/orders/${id}`, config);
};

const payOrder = (id, paymentResult, config) => {
    return http.put(`/orders/${id}/pay`, paymentResult, config);
};

const getMyOrders = (id, config) => {
    return http.get(`/orders/get/userorders/${id}`, config);
};

const getAllOrders = (config) => {
    return http.get("/orders", config);
};

const deleteOrder = (id, config) => {
    return http.delete(`/orders/${id}`, config);
};

const editOrder = (id,data,config)=>{
    return http.put(`/orders/${id}`,data,config)
}
const OrderService = {
    createOrder,
    getOrder,
    payOrder,
    getMyOrders,
    getAllOrders,
    deleteOrder,
    editOrder
};

export default OrderService;
