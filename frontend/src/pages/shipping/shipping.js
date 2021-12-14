import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Form, Field } from "react-final-form";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartAction";
import CheckoutSteps from "../../components/checkoutSteps/checkoutSteps";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
const Shipping = ({ history }) => {
    const cart = useSelector((state) => state.cartReducer);
    const { shippingAddress } = cart;
    const [shippingAddressOne] = useState(shippingAddress.shippingAddressOne);
    const [shippingAddressTwo] = useState(shippingAddress.shippingAddressTwo);
    const [city] = useState(shippingAddress.city);
    const [country] = useState(shippingAddress.country);
    const [phone] = useState(shippingAddress.phone);

    const dispatch = useDispatch();
    const validate = (data) => {
        let errors = {};

        if(!data.shippingAddressOne){
            errors.shippingAddressOne ="Shipping address one required"
        }

        if(!data.country){
            errors.country ="country is required"
        }

        if(!data.phone){
            errors.phone ="phone is required"
        }

        if(!data.city){
            errors.city ="city is required"
        }
      
        return errors;
    };
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const submitForm = (data) => {
        console.log(data)
        dispatch(
            saveShippingAddress({
                shippingAddressOne: data.shippingAddressOne,
                shippingAddressTwo: data.shippingAddressTwo,
                city: data.city,
                country: data.country,
                phone: data.phone,
            })
        );
        history.push("/payment");
    };
    return (
        <>
        <Navbar />
        <div className="form-demo p-5 body-bg ">
            <CheckoutSteps step1 step2 />
            <div className="p-d-flex p-jc-center  ">
                <div className="card login-form-ddd p-5">
                    <h2 className="p-text-center">Shipping</h2>
                    <Form
                        onSubmit={submitForm}
                        initialValues={{
                            shippingAddressOne,
                            shippingAddressTwo,
                            city,
                            country,
                            phone,
                        }}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Field
                                    name="shippingAddressOne"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-home" />
                                                <InputText
                                                    id="shippingAddressOne"
                                                    {...input}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="shippingAddressOne"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    shipping Address One*
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="shippingAddressTwo"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-home" />
                                                <InputText
                                                    id="shippingAddressTwo"
                                                    {...input}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="shippingAddressTwo"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    shipping Address Two
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
                                                <i className="pi pi-home" />
                                                <InputText
                                                    id="city"
                                                    {...input}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="city"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    City*
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                <Field
                                    name="country"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-home" />
                                                <InputText
                                                    id="country"
                                                    {...input}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="country"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    Country*
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                <Field
                                    name="phone"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-phone" />
                                                <InputText
                                                    id="phone"
                                                    {...input}
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="phone"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    Phone*
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Button type="submit" label="Continue" className="p-mt-2" />
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Shipping;
