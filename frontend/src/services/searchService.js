import http from "../utils/http";
const searchGetAll = (productName)=>{
    return http.get(`/products/search?name=${productName}`)

}

const searchService = {
    searchGetAll,
}

export default searchService;

