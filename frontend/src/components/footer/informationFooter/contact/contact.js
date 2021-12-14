import './contact.css'
export function Contact (){

    return(
        <>
        <article className='contact-article col-sm-6  offset-md-1 col-md-3  '>
            <h2 className='pb-2'>Contact</h2>
            <i className="fas fa-envelope pe-2 pb-3"></i><span>email@example.com</span><br/>
            <i className="fas fa-mobile-alt pe-2 "></i><span>+ 02 010 123 1234</span>
        </article>

        </>
    )
}