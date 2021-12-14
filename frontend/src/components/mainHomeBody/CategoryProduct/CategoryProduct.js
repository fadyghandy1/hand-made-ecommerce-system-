import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import {Button} from "react-bootstrap";
import "./CategoryProduct.css";

const CategoryProduct = () => {
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const responsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: "600px",
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: "480px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/categories",
            withCredentials: false,
        })
            .then((res) => {
                setCategory(res.data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/products",
            withCredentials: false,
        })
            .then((res) => {
                setProducts(res.data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const productTemplate = (prod) => {
        return (
            <div className="col-lg-11 col-sm-8 col-md-5 card-div-parent text-center bg-light px-1 my-5 mx-4">
                <div>
                    <Link className="links" to={`/product/${prod._id}`}>
                        <img
                            className="cart-image"
                            src={prod.image}
                            onError={(e) =>
                                (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                            }
                            alt={prod.name}
                        />
                        <p className="pt-1" id="name-display">
                            {prod.name}
                        </p>
                        <div className="d-flex justify-content-center">
                            <small className="px-1">EGP</small>

                            <h5>{prod.price}</h5>
                        </div>
                        <Button className="button-details d-flex justify-content-center cart-button py-1">Details</Button>
                        {/* <Link
                            className="button-details d-flex justify-content-center cart-button py-1"
                            to={`/product/${prod._id}`}
                        >
                            Details
                        </Link>{" "} */}
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div className="container py-5 my-5">
            {category &&
                category.map((cate, index) => {
                    return (
                        <div className="text-center" key={index}>
                            <div className="card snip1168" style={{ maxWidth: "100rem", marginTop: "2em" }}>
                                <Carousel
                                    value={products.filter((prods, index) => {
                                        return prods.category === cate._id && prods.isFeatured && prods;
                                    })}
                                    numVisible={3}
                                    numScroll={1}
                                    responsiveOptions={responsiveOptions}
                                    className="custom-carousel pt-3"
                                    circular
                                    autoplayInterval={10000}
                                    itemTemplate={productTemplate}
                                    header={
                                        <Link className=" links current " to={`/products/${cate._id}`}>
                                            <h1>{cate.name}</h1>
                                        </Link>
                                    }
                                />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default CategoryProduct;
