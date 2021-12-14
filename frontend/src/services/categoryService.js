import http from "../utils/http";


const getAllCateApi = (config) =>{
    return http.get(`/categories`,config)
}

const deleteCateApi = (id,config)=>{
    return http.delete(`/categories/${id}`,config)
} 


const createCateApi = (data,config) => {
    return http.post("/categories", data,config);
  };

  const updateCateApi = (id,data,config)=>{

    return http.put(`/categories/${id}`,data,config)
}
const getOneCateApi = (id,data,config)=>{

    return http.get(`/categories/${id}`,data,config)
}
  
const getAllCateUserApi = () =>{
    return http.get(`/categories`)
}  

const CategoryService = {
    getAllCateApi,
    deleteCateApi,
    createCateApi,
    updateCateApi,
    getOneCateApi,
    getAllCateUserApi

}

export default CategoryService ;  