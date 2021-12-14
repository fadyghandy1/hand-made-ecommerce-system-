import {GET_CATEGORY, DElETE_CATE , CREATE_CATEGORY} from "./types";

import CategoryService from '../services/categoryService'

export const getCateAction = ()=> async(dispatch,getState)=>{
    try{
       
        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const res = await CategoryService.getAllCateApi(config)
       
        dispatch({
            type: GET_CATEGORY,
            payload : res.data
        })
    }catch(err){
        console.log(err)
    }
    
}

export const deletCateAction = (id)=>async(dispatch,getState)=>{

try{
    const {
        userLoginReducer: { userInfo },
    } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    await CategoryService.deleteCateApi(id,config);
    console.log("asdasdagafdgafg")
    dispatch({
        type: DElETE_CATE,
        payload: {id},
    })

    }catch(err){
        console.log(err)
    }

}


export const createCategoryAction = (name, color,icon) => async (dispatch,getState) => {
    try {
        const {
            userLoginReducer: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };


      const res = await CategoryService.createCateApi({ name, color , icon },config);
  
      dispatch({
        type: CREATE_CATEGORY,
        payload: res.data,
      });
  
      return Promise.resolve(res.data); // {email name}
    } catch (err) {
      return Promise.reject(err);
    }
  };

