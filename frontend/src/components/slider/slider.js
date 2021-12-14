import sliderImgOne from "../../images/sliderImages/sliderImage1.jpg";
import sliderImgTwo from "../../images/sliderImages/sliderImage2.jpg";
import sliderImgThree from "../../images/sliderImages/sliderImage3.jpg";

import "./slider.scss";
export function Slider() {
    return (
        <>
        <br/>
        <br/>
            <div id="carouselExampleControls" className="container carousel slide " data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={sliderImgOne} className="d-block w-100 slider-img" alt="Slider"></img>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderImgTwo} className="d-block w-100 slider-img" alt="Slider"></img>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderImgThree} className="d-block w-100 slider-img" alt="Slider"></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}
