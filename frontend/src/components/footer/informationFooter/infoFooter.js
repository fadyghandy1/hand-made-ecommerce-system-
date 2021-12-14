import { AboutUs } from "./aboutUs/aboutUs";
import { Contact } from "./contact/contact";
import "./infoFooter.css"
export function InfoFooter(){
    return(
        <>
        <section className= 'infoSection d-flex justify-content-md-around flex-md-row flex-sm-column align-items-sm-center '>
            <AboutUs />
            <Contact/>
        </section>   
        </>
    )
}