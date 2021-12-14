import "../card/card.scss";
import { Card } from "../card/card";
import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Footer } from "../footer/footer";
import { Navbar } from "../navbar/navbar";
import { ProductSearch } from "../../pages/productSearch/productSearch";

import {
    // getProducts,
    getProductsByCategoryId,
} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";

// import { useLocation } from  "react-router-dom";
const ListProducts = ({ match, location, history }) => {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [sortName, setSortName] = useState("alt");
    const [sortPrice, setSortPrice] = useState("alt");

    // const [dataState, setDataState] = useState([]);
    // const [sortType, setSortType] = useState("sort");
    // const [filterType, setFilterType] = useState("filterBrand");
    //call api
    const products = useSelector((state) => state);
    const dispatch = useDispatch();
    const [starRating] = useState(0);
    useEffect(() => {
        if (match.params.id) {
            if (location.search) {
                dispatch(getProductsByCategoryId(match.params.id, location.search)); //?sort=rating

                if (location.search === "?sort=-price") {
                    setSortPrice("amount-down");
                    setSortName("alt");
                } else if (location.search === "?sort=price") {
                    setSortPrice("amount-up-alt");
                    setSortName("alt");
                } else if (location.search === "?sort=-name") {
                    setSortName("amount-down");
                    setSortPrice("alt");
                } else if (location.search === "?sort=name") {
                    setSortName("amount-up-alt");
                    setSortPrice("alt");
                }
            } else {
                if (starRating) {
                    dispatch(getProductsByCategoryId(match.params.id, location.search));
                }
                dispatch(getProductsByCategoryId(match.params.id, "?"));
            }

            console.log(location.search);
            console.log(typeof location.search);
        }
    }, [dispatch, match.params.id, location.search]);
    // const ratingFunction = (e) => {
    //     console.log(e.target.value);
    //     console.log(typeof location.search);
    //     console.log(location.search);
    //     setStarRating(e.target.value);
    //     console.log(starRating);
    //     if (location.search) {
    //         history.push(`/products/${match.params.id}${location.search}&rating[gte]=${e.target.value}`);
    //     } else {
    //         history.push(`/products/${match.params.id}?rating[gte]=${e.target.value}`);
    //     }
    // };
    // onChange={(e) =>
    //   history.push(
    //     `/products/${match.params.id}?sort=${e.target.value}`
    //   )
    // }
    //
    // const {location} = useLocation();
    // console.log("match the params id", match.params.id);
    // console.log("location search for query", location.search);
    // console.log("location search for query", history);
    // history.push(`products/5f15d467f3a046427a1c26e1/?sort=`);

    // const customIcons = (
    //     <React.Fragment>
    //         <button className="p-sidebar-icon p-link p-mr-1">
    //             <span className="pi pi-print" />
    //         </button>
    //         <button className="p-sidebar-icon p-link p-mr-1">
    //             <span className="pi pi-arrow-right" />
    //         </button>
    //     </React.Fragment>
    // );
    const nameSortHandel = () => {
        if (sortName === "alt") {
            setSortName("amount-up-alt");
            setSortPrice("alt");
            history.push(`/products/${match.params.id}?sort=name`);
        } else if (sortName === "amount-up-alt") {
            setSortName("amount-down");
            setSortPrice("alt");
            history.push(`/products/${match.params.id}?sort=-name`);
        } else if (sortName === "amount-down") {
            setSortName("amount-up-alt");
            setSortPrice("alt");
            history.push(`/products/${match.params.id}?sort=name`);
        }
    };
    const priceSortHandel = () => {
        if (sortPrice === "alt") {
            setSortPrice("amount-up-alt");
            setSortName("alt");
            history.push(`/products/${match.params.id}?sort=price`);
        } else if (sortPrice === "amount-up-alt") {
            setSortPrice("amount-down");
            setSortName("alt");
            history.push(`/products/${match.params.id}?sort=-price`);
        } else if (sortPrice === "amount-down") {
            setSortPrice("amount-up-alt");
            setSortName("alt");
            history.push(`/products/${match.params.id}?sort=price`);
        }
    };

    return (
        <>
            <Navbar />
            <ProductSearch />

            {products.productReducer.length !== 0 &&
                typeof products.productReducer !== "undefined" &&
                products.productReducer.data.data.length > 1 && (
                    <div className="search-body-background">
                        <div className="container">
                            <div className="col-4 ">
                                <Button onClick={() => setVisibleLeft(true)} className="p-mr-2">
                                    {" "}
                                    Sort
                                </Button>
                            </div>
                            <div className=" card-container search-body-background">
                                <div className="row ">
                                    <Sidebar
                                        visible={visibleLeft}
                                        onHide={() => setVisibleLeft(false)}
                                        style={{
                                            background: "#eee",
                                            width: "12rem",
                                        }}
                                    >
                                        <div className="mt-5"></div>

                                        <div className="container large-left-sider">
                                            <div className="row pl-3 text-center">
                                                <div className="col-12 pt-5">
                                                    <p
                                                        style={{
                                                            fontSize: "25px",
                                                            textTransform: "uppercase",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        sort
                                                    </p>
                                                    <hr />

                                                    {/* <select >
                      onChange={(e) => setSortType(e.target.value)}
                        <option value="sort">no sort</option>
                        <option value="price">price</option>
                        <option value="name">name</option>
                        <option value="rating">rating</option>
                      </select> */}
                                                    {/* history.push(`/products/${match.params.id}?sort=-price,name`); */}
                                                    <div
                                                    // onChange={(e) =>
                                                    //   history.push(
                                                    //     `/products/${match.params.id}?sort=${e.target.value}`
                                                    //   )
                                                    // }
                                                    >
                                                        {/* <input type="radio" value="price" name="sort" />{" "}
                            price <br />
                            <input
                              type="radio"
                              value="name"
                              name="sort"
                            /> name <br />
                            <input
                              type="radio"
                              value="rating"
                              name="sort"
                            />{" "}
                            rating <br />
                            <span className="p-sortable-column-icon pi pi-fw pi-sort-alt"></span>
                            <input
                              id="windows"
                              value="windows"
                              name="platform"
                              type="radio"
                              // onChange={this.handleChange}
                            />
                            price <br />
                            <span className="p-sortable-column-icon pi pi-fw pi-sort-amount-up-alt"></span>
                            <input
                              id="windows"
                              value="windows"
                              name="platform"
                              type="radio"
                              // onChange={this.handleChange}
                            />
                            name <br /> */}
                                                        {/* <span > */}

                                                        <Button className="pe-5 ps-3 m-4" onClick={nameSortHandel}>
                                                            <span
                                                                id="nameSort"
                                                                className={`p-sortable-column-icon pi pi-fw pi-sort-${sortName}`} //alt
                                                                onClick={nameSortHandel}
                                                            >
                                                                &nbsp;Name
                                                            </span>
                                                        </Button>
                                                        <br />
                                                        <Button className="pe-5 ps-3 m-4" onClick={priceSortHandel}>
                                                            <span
                                                                id="priceSort"
                                                                className={`p-sortable-column-icon pi pi-fw pi-sort-${sortPrice}`} //amount-up-alt
                                                            >
                                                                &nbsp;Price
                                                            </span>
                                                        </Button>
                                                        <br />
                                                        {/* <span
                              id="ratingSort"
                              className={`p-sortable-column-icon pi pi-fw pi-sort-${}`}//amount-down
                              onClick={ratingSortHandel}
                            >
                              &nbsp;rating
                            </span> */}
                                                        {/* </span> */}
                                                        <br />
                                                    </div>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </Sidebar>

                                    <div className="row container d-flex justify-content-center rounded-3">
                                        {products.productReducer.data.data &&
                                            products.productReducer.data.data.map((product, index) => (
                                                <Card
                                                    key={index}
                                                    name={product.name}
                                                    description={product.description}
                                                    price={product.price}
                                                    image={product.image}
                                                    id={product.id}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            <Footer />
        </>
    );
};
export default ListProducts;
