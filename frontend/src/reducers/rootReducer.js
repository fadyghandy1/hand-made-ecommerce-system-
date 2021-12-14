import { DATA_LOADED, DELETE_ORDER, SINGLE_ORDER,DATA_UPDATED} from '../actions/types';

//Intial State
const initState = {
  Data: null,
  singleOrderData: {},
};

//Reducers
function rootReducer (state = initState, action)  {
  const { payload } = action;
  
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
        Data: payload,
      };

    case DELETE_ORDER:
      return {
        ...state,
        
        // Data: payload,
      };

    case SINGLE_ORDER:
      return {
        ...state,
        singleOrderData: payload,
      };
      
    case DATA_UPDATED:
      return {
        ...state,
        singleOrderData: payload,
      };

    default:
      return { ...state };
  }
};

export const orderdelReducer = (orders2= [], action)=>{
  const {type , payload} = action

  switch (type) {
    
      
      case DELETE_ORDER:
          return orders2.filter(({id})=> id !== payload.id) 
      
      
      default:
          return orders2
  }

}
export default rootReducer;
