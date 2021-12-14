import {GET_CATEGORY , DElETE_CATE , CREATE_CATEGORY} from "../actions/types";


export const categoryReducer = (categories = [], action)=>{
    const {type , payload} = action

    switch (type) {
        case GET_CATEGORY:
            return payload

        case DElETE_CATE:
            return categories.filter(({id})=> id !== payload.id) 

            case CREATE_CATEGORY:
                return [...categories, payload];
            
        
        
        default:
            return categories
    }
    
}