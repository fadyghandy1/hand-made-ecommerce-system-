import * as TYPES from '../actions/types'
const searchReducer = (searchProducts = [], action) => {

    const { type, payload } = action;
    switch (type) {
        case TYPES.SEARCH_IN_PRODUCT:
            return payload

        default:
            return searchProducts;
    }
}

export default searchReducer