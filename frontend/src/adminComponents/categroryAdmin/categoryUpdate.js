import React, { useState, useEffect, useRef } from "react";
import CategoryService from "../../services/categoryService";
import { useSelector } from "react-redux";
import { Toast } from 'primereact/toast';
import NavBar from "../NavBar/NavBar";


const CategoryUpdate = (props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");
  const toast = useRef(null);
  const [validName, setvalidName] = useState("");
  const [validColor, setvalidColor] = useState("");
  const [validIcon, setvalidIcon] = useState("");

  const nameRegex = /^[a-zA-Z ]+$/;


  const valid = (e)=>{
    switch (e.target.name) {
        case "name":
            e.target.value.length > 50 || e.target.value.length < 3 ||  !nameRegex.test (e.target.value)?
            setvalidName("*name is required and must be greater than 3 letters and less than 50 letters") :setvalidName("")
            console.log(typeof e.target.value ,"ddddddddddd" )
            break;
            
        case "color":
            !nameRegex.test(e.target.value) ?
            setvalidColor("color is required and must be valid") :setvalidColor("")
        
            break;
       case "icon":
            !nameRegex.test(e.target.value) ?
            setvalidIcon("icon not valid") :setvalidIcon("")
            break;
        
        default:
            break;
    }
}
  



  const getCate = (id="5f15d545f3a046427a1c26e2", config) => {
    CategoryService.getOneCateApi(id, config)
      .then((response) => {
        console.log("asdasdfasdf asdg agsd");
        setName(response.data.data.data.name);
        setColor(response.data.data.data.color);
        setIcon(response.data.data.data.icon);

        console.log("asdasdfasdf asdg agsd");
        console.log(name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userLogin = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  useEffect(() => {
    if (userInfo.length !== 0) {
      if (userInfo.data.user.isAdmin === false) {
        props.history.push("/");
      } else {
        getCate(props.match.params.id, config);
        console.log("datasssss")
      }
    } else {
      props.history.push("/login");
    }
  }, [userInfo, props.match.params.id]);

  function updateContent() {
    // console.log(currentUserDetails,"ddddddddddddddddddd")

    let item = { name, icon , color };
    console.log(item);
    // dispatch(updateUserAction(props.match.params.id,item))

    CategoryService.updateCateApi(props.match.params.id, item, config)
      .then((response) => {
        // setCurrentUserDetails(response.data.data.data)
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Cate Updated",
          life: 3000,
        });

        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
    <NavBar/>
   

    <div className="container col-sm-6 p-5 my-5 user-updated-form "> <h3 className= "text-center pm-5"> Category Update</h3>
     <Toast ref={toast} />

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Name</label>
            <input type="text" class="form-control" id="name" name="name" onChange={e=>{valid(e); setName (e.target.value)}}  placeholder="name" defaultValue={name} />
            <small className = "text-danger">{validName}</small>

    </div>
    <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Color </label>    

            <input type="text" class="form-control" id="email" name="color" onChange={e=>{valid(e);setColor (e.target.value)}}  placeholder="color" defaultValue={color}/>
            <small className = "text-danger">{validColor}</small>
    </div>

    
   
     
    <br/>
    <button  className="btn btn-primary"  onClick = {updateContent}>Update</button>


    </div>
   
</>
  );
};

export default CategoryUpdate;
