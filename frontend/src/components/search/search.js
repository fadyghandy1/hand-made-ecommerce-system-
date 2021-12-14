
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductSearch } from '../../pages/productSearch/productSearch'

import './search.scss'

export function Search(){

    const[productName,setProductName] = useState("")

    const val = (e)=>{
        setProductName(e.target.value)
    }
    return(
        <>
            <div className="search">

                <form  className="d-flex justify-content-center px-5 mx-5 ">
                     <input className="form-control me-2" type="search" onChange={(e)=>val(e)}  placeholder="Search" aria-label="Search"></input>
                     <button className="navBar-search-button" type="submit"> <Link to ={`/productSearch?${productName}`}> Search</Link></button>
                </form>
            </div>

            <ProductSearch ProdName = {productName}/>
            
        
        </>
    )
}