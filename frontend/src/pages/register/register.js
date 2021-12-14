import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Form, Field } from "react-final-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message";
import Loader from "../../components/loader/loader";
import { register } from "../../actions/userAction";
import './register.scss'
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
const Register = ({ history, location }) => {

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegisterReducer);
    const { loading, error, userInfo } = userRegister;
    const redirect = location.search ? location.search.split("=")[1] : "/";

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

        if (!data.password) {
            errors.password = "Password is required.";
        }

        if (!data.passwordConfirm) {
            errors.passwordConfirm = "Password Confirm is required.";
        }
        if (data.passwordConfirm !== data.password) {
            errors.passwordConfirm = "Password and password confirm dosn't match";
        }

        return errors;
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    useEffect(() => {
        if (typeof userInfo !== "undefined" && !Array.isArray(userInfo)) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect, error]);

    const submitForm = (data) => {
        dispatch(register(data.name, data.email, data.password, data.passwordConfirm));
    };
    return (
        <>
        <Navbar />
        <div className="form-demo p-5 body-bg">
            <div className="p-d-flex p-jc-center">
                <div className="card p-5 login-form-ddd">
                    <h2 className="p-text-center">Register</h2>
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form
                        onSubmit={submitForm}
                        initialValues={{ name: "", email: "", password: "", passwordConfirm: "" }}
                        validate={validate}
                        render={({ handleSubmit,errors }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Field
                                    name="name"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <InputText
                                                    id="name"
                                                    {...input}
                                                    autoFocus
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
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
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    Email*
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Field
                                    name="password"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <Password
                                                    id="password"
                                                    {...input}
                                                    toggleMask
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="password"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    Password*
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />

                                <Field
                                    name="passwordConfirm"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <Password
                                                    id="passwordConfirm"
                                                    {...input}
                                                    toggleMask
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="passwordConfirm"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    Confirm Password*
                                                </label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )}
                                />
                                <Button type="submit" disabled={Object.keys(errors).length > 0 ? true : false} label="Submit" className="p-mt-2" />
                            </form>
                        )}
                    />
                    <div className="pt-3">
                        Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Register;
