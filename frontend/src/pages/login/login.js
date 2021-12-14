import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Form, Field } from "react-final-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message";
import Loader from "../../components/loader/loader";
import { login } from "../../actions/userAction";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
const Login = ({ history, location }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLoginReducer);
    const { loading, error, userInfo } = userLogin;
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const validate = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = "Email is required.";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = "Invalid email address. E.g. example@email.com";
        }

        if (!data.password) {
            errors.password = "Password is required.";
        }

        return errors;
    };
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    useEffect(() => {
        if (typeof userInfo !== "undefined" && !Array.isArray(userInfo)) {
            console.log(userInfo.data.user.isAdmin)
            if (userInfo.data.user.isAdmin) {
                history.push("/admin");
            }
            else{
                history.push(redirect);
            }
        }
    }, [history, userInfo, redirect, error]);

    const submitForm = (data) => {
        console.log(data);

        dispatch(login(data.email, data.password));
    };
    return (
        <>
            <Navbar />
            <div className="form-demo p-5 body-bg ">
                <div className="p-d-flex p-jc-center">
                    <div className="card p-5 login-form-ddd">
                        <h2 className="p-text-center">Login</h2>
                        {error && <Message variant="danger">{error}</Message>}
                        {loading && <Loader />}
                        <Form
                            onSubmit={submitForm}
                            initialValues={{ email: "", password: "" }}
                            validate={validate}
                            render={({ handleSubmit ,errors }) => (
                                <form onSubmit={handleSubmit} className="p-fluid">
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
                                    <Button type="submit" label="Submit" disabled={Object.keys(errors).length > 0 ? true : false} className="p-mt-2" />
                                </form>
                            )}
                        />
                        <div className="pt-3">
                            New Customer ?{" "}
                            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
