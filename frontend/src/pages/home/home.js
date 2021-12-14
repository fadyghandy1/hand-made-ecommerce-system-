import {Slider} from '../../components/slider/slider'
import { ProductSearch } from '../productSearch/productSearch';
import './home.scss'
import CategoryProduct from '../../components/mainHomeBody/CategoryProduct/CategoryProduct'
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';
export function Home(){
    return(
        <>
            <div className = "home-body" >
            <Navbar />
                <ProductSearch/>
                <Slider/>
                <CategoryProduct/>
                <Footer />
            </div>
        </>
    )
} 