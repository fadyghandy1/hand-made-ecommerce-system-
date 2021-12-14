import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import searchReducer from "./searchReducer";
import { orderdelReducer } from "./rootReducer";
import rootReducer from "./rootReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from "./orderReducer";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  usersReducer,
} from "./userReducer";
import {categoryReducer} from './categoryReducer'

export default combineReducers({
  productReducer,
  cartReducer,
  searchReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  rootReducer,
  usersReducer,
  orderdelReducer,
  categoryReducer,
});
