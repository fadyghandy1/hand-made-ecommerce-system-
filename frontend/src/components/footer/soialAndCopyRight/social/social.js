import './social.css'
import {Link} from "react-router-dom";

export function Socail (){
    return(
        <>
        <article className='social-rticle'>
            <Link to={""}>
                <i className="fab fa-twitter-square"></i>
            </Link>
            <Link to={""}>
                <i className="fab fa-facebook-square px-3"></i>
            </Link>
            <Link to={""}>
                <i className="fab fa-instagram"></i>
            </Link>
            <Link to={""}>
                <i className="fab fa-youtube-square px-3"></i>
            </Link>
            </article>




        </>
    )
    
}