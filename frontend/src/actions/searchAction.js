import * as TYPES from "./types";
import searchService from "../services/searchService";

export const searchAction = (prodName) => async(dispatch) => {
    try {
        const res = await searchService.searchGetAll(prodName);
        // console.log(res);
        dispatch({
            type: TYPES.SEARCH_IN_PRODUCT,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

// export default SearchAction;