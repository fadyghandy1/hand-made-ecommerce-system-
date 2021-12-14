import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";

import { RadioButton } from "primereact/radiobutton";

import CheckoutSteps from "../../components/checkoutSteps/checkoutSteps";
import { savePaymentMethod } from "../../actions/cartAction";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
const Payment = ({ history }) => {
    const cart = useSelector((state) => state.cartReducer);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push("/shipping");
    }
    const [PaymentMethod, setPaymentMethod] = useState("PayPal");
    const validate = (data) => {
        let errors = {};

        if (!data.PaymentMethod) {
            errors.shippingAddressOne = "PaymentMethod is required";
        }

        return errors;
    };
    const dispatch = useDispatch();

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const submitForm = (data) => {
        dispatch(savePaymentMethod(data.PaymentMethod));
        history.push("/placeorder");
    };
    return (
        <>
        <Navbar />
        <div className="form-demo p-5 body-bg ">
            <CheckoutSteps step1 step2 step3 />
            <div className="p-d-flex p-jc-center">
                <div className="card p-5 login-form-ddd">
                    <h2 className="p-text-center">Payment Method</h2>
                    <Form
                        onSubmit={submitForm}
                        initialValues={{
                            PaymentMethod,
                        }}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Field
                                    name="PaymentMethod"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <div className="p-field-radiobutton">
                                                <RadioButton
                                                    inputId="PayPal"
                                                    name="PayPal"
                                                    value="PayPal"
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    checked={PaymentMethod === "PayPal"}
                                                />
                                                <label htmlFor="PaymentMethod">PayPal or Credit Card</label>
                                            </div>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                <Field
                                    name="PaymentMethod"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <div className="p-field-radiobutton">
                                                <RadioButton
                                                    inputId="Stripe"
                                                    name="Stripe"
                                                    value="Stripe"
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    checked={PaymentMethod === "Stripe"}
                                                />
                                                <label htmlFor="PaymentMethod">Stripe</label>
                                            </div>
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

export default Payment;
