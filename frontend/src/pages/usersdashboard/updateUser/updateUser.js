import { useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import UserService from "../../../services/userService";
import { Toast } from "primereact/toast";
import "./updateUsers.scss";
import NavBar from "../../../adminComponents/NavBar/NavBar";

export const UpdateUser = (props) => {
    const [email, setEmail] = useState("");
    const emailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const nameRegex = /^[a-zA-Z ]+$/;
    const phoneRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/;

    const [x] = useState("");

    const [validName, setvalidName] = useState("");
    const [validEmail, setvalidEmail] = useState("");

    // const [validStreet, setValidStreet] = useState("");
    // const [validApartment, setValidApartment] = useState("");
    // const [ValidCity, setValidCity] = useState("");
    // const [vlidCountry, setValidCountry] = useState("");
    // const [vlidZip, setValidZip] = useState("");
    const [validPhone, setValidPhone] = useState("");
    console.log(x, "x value");

    const valid = (e) => {
        switch (e.target.name) {
            case "name":
                e.target.value.length > 50 || e.target.value.length < 3 || !nameRegex.test(e.target.value)
                    ? setvalidName("*name is required and must be greater than 3 letters and less than 50 letters")
                    : setvalidName("");
                console.log(typeof e.target.value, "ddddddddddd");
                break;

            case "email":
                !emailRegex.test(e.target.value)
                    ? setvalidEmail("email is required and must be valid")
                    : setvalidEmail("");

                break;
            case "phone":
                !phoneRegex.test(e.target.value) ? setValidPhone("phone not valid") : setValidPhone("");
                break;

            default:
                break;
        }
    };
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const toast = useRef(null);

    const getUser = (id, config) => {
        UserService.getUserApi(id, config)
            .then((response) => {
                setName(response.data.data.data.name);
                setEmail(response.data.data.data.email);
                setCity(response.data.data.data.city);
                setCountry(response.data.data.data.country);
                setStreet(response.data.data.data.street);
                setApartment(response.data.data.data.apartment);
                setZip(response.data.data.data.zip);
                setIsAdmin(response.data.data.data.isAdmin);
                setPhone(response.data.data.data.phone);
                console.log(response.data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // auth
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
                getUser(props.match.params.id, config);
            }
        } else {
            props.history.push("/login");
        }
    }, [userInfo, props.match.params.id]);

    function updateContent() {
        // console.log(currentUserDetails,"ddddddddddddddddddd")

        let item = { apartment, city, country, email, name, street, zip, phone, isAdmin };
        console.log(item);
        // dispatch(updateUserAction(props.match.params.id,item))

        UserService.updateUserApi(props.match.params.id, item, config)
            .then((response) => {
                // setCurrentUserDetails(response.data.data.data)
                toast.current.show({ severity: "success", summary: "Successful", detail: "User Updated", life: 3000 });

                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <NavBar />
            {typeof email !== "undefined" ? (
                <div className="container col-sm-6 p-5 my-5 user-updated-form ">
                    {" "}
                    <h3 className="text-center pm-5"> User Update</h3>
                    <Toast ref={toast} />
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            onChange={(e) => {
                                valid(e);
                                setName(e.target.value);
                            }}
                            placeholder="name"
                            defaultValue={name}
                        />
                        <small className="text-danger">{validName}</small>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="phone"
                            name="phone"
                            onChange={(e) => {
                                valid(e);
                                setPhone(e.target.value);
                            }}
                            placeholder="phone"
                            defaultValue={street}
                        />
                        <small className="text-danger">{validPhone}</small>
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                            Country
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="country"
                            name="country"
                            onChange={(e) => {
                                setCountry(e.target.value);
                            }}
                            placeholder="country"
                            defaultValue={country}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                            City
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="city"
                            name="city"
                            onChange={(e) => {
                                setCity(e.target.value);
                            }}
                            placeholder="city"
                            defaultValue={city}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                            Street
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="street"
                            name="street"
                            onChange={(e) => {
                                setStreet(e.target.value);
                            }}
                            placeholder="street"
                            defaultValue={street}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                            Apartment
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="apartment"
                            name="apartment"
                            onChange={(e) => {
                                setApartment(e.target.value);
                            }}
                            placeholder="apartment"
                            defaultValue={apartment}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">
                            ZIP code
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="zip"
                            name="zip"
                            placeholder="ZIP"
                            onChange={(e) => {
                                setZip(e.target.value);
                            }}
                            defaultValue={zip}
                        />
                    </div>
                    <div class="form-check form-switch">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            name="isAdmin"
                            id="isAdmin"
                            onChange={(e) => {
                                setIsAdmin(!isAdmin);
                            }}
                            checked={isAdmin}
                        />
                        <label class="form-check-label" for="isAdmin">
                            Admin
                        </label>
                    </div>
                    <br />
                    <button className="btn btn-primary" onClick={updateContent}>
                        Update
                    </button>
                </div>
            ) : (
                ""
            )}
        </>
    );
};
