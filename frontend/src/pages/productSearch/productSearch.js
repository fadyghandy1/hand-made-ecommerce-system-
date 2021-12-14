import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchAction } from "../../actions/searchAction";
import "./poroductSearch.scss";

export  function ProductSearch() {
  const { searchReducer: searchProducts } = useSelector((state) => state);


  

  const[productName,setProductName] = useState("")

    const val = (e)=>{
        setProductName(e.target.value)
        
    }



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchAction(productName));

    // console.log(searchProducts,'test')
    // console.log('prodName', ProdName.length)
  }, [productName]);

  //console.log(searchProducts.results,'test33')
  //console.log(window.location.pathname)

  return (
      <>
   <div className=" pt-3 search-body-background">

                <form  className="d-flex justify-content-center container  " action={'/productSearch'}>
                     <input className="form-control me-2" type="search" onChange={(e)=>val(e)}  placeholder="Search" aria-label="Search" ></input>
                     <button className="navBar-search-button" type="submit">Search
                     </button>
                </form>
                
            </div>
       



      {
         
      typeof searchProducts.data !== "undefined" ? (
      
        window.location.pathname === "/productSearch" ? (
          <div className="card-container  py-5 search-body-background">
            <div className=" container div-card">
              {searchProducts.data.data.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="col-lg-3 col-sm-8 col-md-5 card-div-parent text-center bg-light rounded-3 px-1 my-5 mx-3"
                  >
                    <img className="cart-image" src={e.image} alt={e.name}/>
                    <p className="pt-1">{e.name}</p>
                    <div className="d-flex justify-content-center">
                      <small className="px-1">EGP</small>
                      <h5>{e.price}</h5>
                    </div>
                    {/* <ProductRate /> */}
                      
                      <Link className="button-details cart-button py-1" to={`/product/${e.id}`}>
                        Details
                      </Link>{" "}
                    {/* </button> */}
                  </div>
                );
              })}
            </div>
          </div>
        ) : productName.length !== 0? (
          searchProducts.data.data.map((e, i) => {
            return (
              <div className="container">

                <Link className="search-name-link " to={`/product/${e.id}`}>
                  <div key={i} className="search-name d-flex align-items-center">
                    <h6 className ="pe-4">{e.name}</h6>
                    <img width="40px" height="40px"  src={e.image}  alt={e.name}/>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <span></span>
        )
      ) : (
        <span></span>
      )}

     
       </>
  );
}
