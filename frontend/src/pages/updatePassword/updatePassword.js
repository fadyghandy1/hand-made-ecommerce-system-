import React, { useEffect } from "react";
import { Form, Field } from "react-final-form";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message";
import Loader from "../../components/loader/loader";
import { updateUserPassword } from "../../actions/userAction";
import './updatePassword.scss'
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLogin;

    const userUpadatePassword = useSelector((state) => state.userUpdatePasswordReducer);
    const { success, error, loading } = userUpadatePassword;

    const validate = (data) => {
        let errors = {};

        if (!data.passwordCurrent) {
            errors.passwordCurrent = "Current password is required.";
        }

        if (!data.password) {
            errors.password = "Password is required.";
        }

        if (!data.passwordConfirm) {
            errors.passwordConfirm = "Confirm Password is required.";
        }

        if (data.passwordConfirm !== data.password) {
            errors.passwordConfirm = "Password and Confirm password dosn't match";
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
        }
    }, [history, userInfo]);

    const submitForm = (data) => {
        dispatch(
            updateUserPassword({
                password: data.password,
                passwordConfirm: data.passwordConfirm,
                passwordCurrent: data.passwordCurrent,
            })
        );
    };
    return (
        <>
        <Navbar />
        <div className="form-demo my-5  ">
            <div className="p-d-flex p-jc-center">
                <div className="card p-5 updated-pass-form">
                    <h5 className="p-text-center">Change Password</h5>
                    {error && <Message variant="danger">{error}</Message>}
                    {success && <Message variant="success">Password Updated Successfully</Message>}
                    {loading && <Loader />}
                    <Form
                        onSubmit={submitForm}
                        initialValues={{ passwordCurrent: "", password: "", passwordConfirm: "" }}
                        validate={validate}
                        render={({ handleSubmit ,errors}) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Field
                                    name="passwordCurrent"
                                    render={({ input, meta }) => (
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <Password
                                                    id="passwordCurrent"
                                                    {...input}
                                                    toggleMask
                                                    className={classNames({ "p-invalid": isFormFieldValid(meta) })}
                                                />
                                                <label
                                                    htmlFor="passwordCurrent"
                                                    className={classNames({ "p-error": isFormFieldValid(meta) })}
                                                >
                                                    Current Password*
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
                                                    password*
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

                                <Button type="submit" label="Submit" disabled={Object.keys(errors).length > 0 ? true : false} className="p-mt-2" />
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

export default UpdatePassword;
