import http from "../utils/http";

const getOne = (id) => {
    return http.get(`/products/${id}`);
};
const getAll = () => {
    return http.get("/products"); //?lgt
};
const getAllByCategoryId = (id, queryString) => {
    return http.get(`/products/category/${id}${queryString}`);
};
const updateOne = (id, product, config) => {
    return http.put(`/products/${id}`, product, config);
};
const AddOne = (product, config) => {
    return http.post("/products", product, config);
};
const deleteOne = (id, config) => {
    return http.delete(`/products/${id}`, config);
};
const ProductService = {
    getOne,
    getAll,
    getAllByCategoryId,
    updateOne,
    AddOne,
    deleteOne,
};

export default ProductService;
