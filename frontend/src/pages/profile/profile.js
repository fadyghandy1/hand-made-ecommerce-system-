import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Form, Field } from "react-final-form";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message";
import Loader from "../../components/loader/loader";
import "./profile.scss";
import { getUserDetails, updateUserProfile } from "../../actions/userAction";
import { listMyOrders } from "../../actions/orderAction";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
const Profile = ({ history }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetailsReducer);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLogin;

    const userUpadateProfile = useSelector((state) => state.userUpdateProfileReducer);
    const { success } = userUpadateProfile;

    const orderMyList = useSelector((state) => state.orderListMyReducer);
    const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

    const validate = (data) => {
        let errors = {};
        if (!data.name) {
            errors.name = "Name is required.";
        }

        if (!data.email) {
            errors.email = "Email is required.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = "Invalid email address. E.g. example@email.com";
        }

        return errors;
    };
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    useEffect(() => {
        if (userInfo.length === 0) {
            history.push("/login");
        } else {
            if (!user.name) {
                dispatch(getUserDetails());
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
                setStreet(user.street);
                setApartment(user.apartment);
                setCity(user.city);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submitForm = (data) => {
        dispatch(
            updateUserProfile({
                _id: user.id,
                name:data.name,
                email:data.addres,
                street:data.street,
                apartment:data.apartment,
                city:data.city,
            })
        );
    };
    return (
        <>
         <Navbar />
        <div className="py-5">
        <Container>
            <Row>
                <Col md={5}>
                    <h2>User Profile</h2>
                    <br/>
                    {error && <Message variant="danger">{error}</Message>}
                    {success && <Message variant="success">Profile Updated</Message>}
                    {loading && <Loader />}
                    <div className="form-profile profile-form">
                        <div className="card" style={{ border: 0 }}>
                            {error && <Message variant="danger">{error}</Message>}
                            {loading && <Loader />}
                            <Form
                                onSubmit={submitForm}
                                initialValues={{
                                    name: user.name,
                                    email: user.email,
                                    street: user.street,
                                    apartment: user.apartment,
                                    city: user.city,
                                }}
                                validate={validate}
                                render={({ handleSubmit }) => (
                                    <form onSubmit={handleSubmit} className="p-fluid mt-2 p-3">
                                        <Field
                                            name="name"
                                            render={({ input, meta }) => (
                                                <div className="p-field">
                                                    <span className="p-float-label">
                                                        <InputText
                                                            id="name"
                                                            {...input}
                                                            autoFocus
                                                            className={classNames({
                                                                "p-invalid": isFormFieldValid(meta),
                                                            })}
                                                        />
                                                        <label
                                                            htmlFor="name"
                                                            className={classNames({
                                                                "p-error": isFormFieldValid(meta),
                                                            })}
                                                        >
                                                            Name*
                                                        </label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                        <Field
                                            name="email"
                                            render={({ input, meta }) => (
                                                <div className="p-field">
                                                    <span className="p-float-label p-input-icon-right">
                                                        <i className="pi pi-envelope" />
                                                        <InputText
                                                            id="email"
                                                            {...input}
                                                            className={classNames({
                                                                "p-invalid": isFormFieldValid(meta),
                                                            })}
                                                        />
                                                        <label
                                                            htmlFor="email"
                                                            className={classNames({
                                                                "p-error": isFormFieldValid(meta),
                                                            })}
                                                        >
                                                            Email*
                                                        </label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                        <Field
                                            name="street"
                                            render={({ input, meta }) => (
                                                <div className="p-field">
                                                    <span className="p-float-label p-input-icon-right">
                                                        <i className="pi pi-home" />
                                                        <InputText
                                                            id="street"
                                                            {...input}
                                                            className={classNames({
                                                                "p-invalid": isFormFieldValid(meta),
                                                            })}
                                                        />
                                                        <label
                                                            htmlFor="street"
                                                            className={classNames({
                                                                "p-error": isFormFieldValid(meta),
                                                            })}
                                                        >
                                                            street
                                                        </label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                        <Field
                                            name="apartment"
                                            render={({ input, meta }) => (
                                                <div className="p-field">
                                                    <span className="p-float-label p-input-icon-right">
                                                        <i className="pi pi-home" />
                                                        <InputText
                                                            id="apartment"
                                                            {...input}
                                                            className={classNames({
                                                                "p-invalid": isFormFieldValid(meta),
                                                            })}
                                                        />
                                                        <label
                                                            htmlFor="apartment"
                                                            className={classNames({
                                                                "p-error": isFormFieldValid(meta),
                                                            })}
                                                        >
                                                            Apartment
                                                        </label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="city"
                                            render={({ input, meta }) => (
                                                <div className="p-field">
                                                    <span className="p-float-label p-input-icon-right">
                                                        <i className="pi pi pi-home" />
                                                        <InputText
                                                            id="city"
                                                            {...input}
                                                            className={classNames({
                                                                "p-invalid": isFormFieldValid(meta),
                                                            })}
                                                        />
                                                        <label
                                                            htmlFor="city"
                                                            className={classNames({
                                                                "p-error": isFormFieldValid(meta),
                                                            })}
                                                        >
                                                            City
                                                        </label>
                                                    </span>
                                                    {getFormErrorMessage(meta)}
                                                </div>
                                            )}
                                        />
                                        <Button type="submit" label="Submit" className="p-mt-2" />
                                    </form>
                                )}
                            />
                        </div>
                    </div>
                </Col>
               
                <Col  md={7} >
                
                    <h2>My orders</h2>
                    <br/>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant="danger">{errorOrders}</Message>
                    ) : (
                        <Table striped borderd hover responsive className="table-sm">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Date</td>
                                    <td>Total</td>
                                    <td>Paid</td>
                                    <td>Status</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                                        <td>
                                            {order.status === "0"
                                                ? "Pending"
                                                : order.status === "1"
                                                ? "Proccessd"
                                                : order.status === "2"
                                                ? "Shipped"
                                                : order.status === "3"
                                                ? "Deliverd"
                                                : "Failed"}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order.id}`}>
                                                <Button className="btn-sm" variant="dark">
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
        </div>
        <Footer />
        </>
    );
};

export default Profile;
