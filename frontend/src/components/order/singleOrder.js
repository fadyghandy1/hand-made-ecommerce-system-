import React, { useEffect, useState, useRef } from "react";
import { getSingleOrder, updateOrder } from "../../actions/orderAdminAction";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Fieldset } from "primereact/fieldset";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import NavBar from "../../adminComponents/NavBar/NavBar";

const Order = ({ match }) => {
    const { id } = match.params;
    const toast = useRef(null);
    const single = useSelector((state) => state.rootReducer);
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    // const [update, setUpdate] = useState(false);
    console.log(single);
    const ORDER_STATUS = {
        0: {
            label: "Pending",
            color: "primary",
        },
        1: {
            label: "Processed",
            color: "warning",
        },
        2: {
            label: "Shipped",
            color: "warning",
        },
        3: {
            label: "Deliverd",
            color: "success",
        },
        4: {
            label: "Failed",
            color: "danger",
        },
    };
    const orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
        return {
            id: key,
            name: ORDER_STATUS[key].label,
        };
    });

    useEffect(() => {
        if (id) {
            dispatch(getSingleOrder(id));
        }
    }, [id]);

    const updateStatus = (status) => {
        dispatch(updateOrder(id, status));
        toast.current.show({
            severity: "success",
            summary: "Status Updated",
            detail: "Status Updated Successfully",
            life: 3000,
        });
    };

    return (
        <>
        <NavBar/>
        <div className="container my-5 ">
            {Object.keys(single.singleOrderData).length !== 0 && (
                <div>
                    <Toast ref={toast} />
                    <Card title="View Order">
                        <Fieldset legend="Order Details" toggleable className="mb-4">
                            <div className="p-grid">
                                <div className="col-4">
                                    <h5>Order Id</h5>
                                    <p>{single.singleOrderData.id}</p>
                                </div>
                                <div className="col-4">
                                    <h5>Order Date</h5>
                                    <p>{new Date(single.singleOrderData.createdAt).toUTCString()}</p>
                                </div>
                                <div className="col-4">
                                    <h5>Order Status</h5>
                                    <Dropdown
                                        value={single.singleOrderData.status}
                                        options={orderStatuses}
                                        onChange={(e) => {
                                            setStatus(e.target.value);
                                            updateStatus(e.target.value);
                                        }}
                                        optionValue="id"
                                        optionLabel="name"
                                    ></Dropdown>
                                </div>
                                <div className="col-4">
                                    <h5>Order Total Price</h5>
                                    <p>{single.singleOrderData.totalPrice}</p>
                                </div>
                            </div>
                        </Fieldset>
                        <Fieldset legend="Order Items" toggleable className="mb-4">
                            <div className="p-grid">
                                <div className="col-2 text-center font-bold">Name</div>
                                <div className="col-2 text-center font-bold">Brand</div>
                                <div className="col-2 text-center font-bold">Category</div>
                                <div className="col-2 text-center font-bold">Price</div>
                                <div className="col-2 text-center font-bold">Quantity</div>
                                <div className="col-2 text-center font-bold">Subtotal</div>
                            </div>
                            <hr style={{ border: "1px solid #000" }} />
                            {single.singleOrderData.orderItems.map((order) => (
                                <div key={order.id} className="p-grid mb-3">
                                    <div className="col-2 text-center">{order.product.name}</div>
                                    <div className="col-2 text-center">{order.product.brand}</div>
                                    <div className="col-2 text-center">{order.product.category.name}</div>
                                    <div className="col-2 text-center">{order.product.price}</div>
                                    <div className="col-2 text-center">{order.quantity}</div>
                                    <div className="col-2 text-center">{order.product.price * order.quantity}</div>
                                </div>
                            ))}
                            <hr style={{ border: "1px solid #000" }} />
                            <div className="p-grid" style={{ color: "green" }}>
                                <div className="p-col-2 p-offset-8 text-center font-bold">Total Price</div>
                                <div className="p-col-2 text-center">{single.singleOrderData.totalPrice}</div>
                            </div>
                        </Fieldset>
                        <Fieldset legend="Order Address" toggleable className="mb-4">
                            <div className="p-grid">
                                <div className="col-4">
                                    <h5>Order Address</h5>
                                    <p>
                                        {single.singleOrderData.shippingAddressOne}
                                        <br />
                                        {single.singleOrderData.shippingAddressTwo}
                                        <br />
                                        {single.singleOrderData.zip} {single.singleOrderData.city}
                                        <br />
                                        {single.singleOrderData.country}
                                        <br />
                                    </p>
                                </div>
                                <div className="col-4">
                                    <h5>Customer Name</h5>
                                    <p>{single.singleOrderData.user.name}</p>
                                </div>
                                <div className="col-4">
                                    <h5>Contact Info</h5>
                                    <p>{single.singleOrderData.phone}</p>
                                </div>
                            </div>
                        </Fieldset>
                    </Card>
                </div>
            )}
        </div>
        </>
    );
};

export default Order;
