import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/message";
import { getOrderDetails, payOrder } from "../../actions/orderAction";
import Loader from "../../components/loader/loader";
import http from "../../utils/http";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../actions/types";
import  {Footer} from '../../components/footer/footer'
import  {Navbar} from '../../components/navbar/navbar'

const DisplayOrder = ({ history, match }) => {
    const orderId = match.params.id;
    const [sdkReady, setSDKReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetailsReducer);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPayReducer);
    const { loading: loadingPay, success: successPay } = orderPay;

    const userLogin = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await http.get("/config/paypal");
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSDKReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay) {
            console.log('we succesfuly paid')
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSDKReady(true);
            }
        }
    }, [dispatch, orderId, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
        console.log('hi')
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    };
    return (
        <>
        <Navbar />
        <div className = "my-5 - py-5">
        <Container>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <h1>Order {order.id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {order.user.email}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>
                                        {order.shippingAddressOne},{order.shippingAddressTwo},{order.city},
                                        {order.country}
                                    </p>
                                    {order.status === "0" ? (
                                        <Message variant="info">Status: Pending</Message>
                                    ) : order.status === "1" ? (
                                        <Message variant="info">Status: Proccessd</Message>
                                    ) : order.status === "2" ? (
                                        <Message variant="info">Status: Shipped</Message>
                                    ) : order.status === "3" ? (
                                        <Message variant="info">Status: Deliverd</Message>
                                    ) : (
                                        <Message variant="danger">Status: Failed</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method:</strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant="success">Paid</Message>
                                    ) : (
                                        <Message variant="danger">Not Paid</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>Your Order is Empty</Message>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                src={item.product.image}
                                                                alt={item.product.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                                className="product-link"
                                                                to={`/product/${item.product.id}`}
                                                            >
                                                                {item.product.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.quantity} x ${item.product.price} = $
                                                            {item.quantity * item.product.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
        </div> 
        <Footer />
        </>
    );
};

export default DisplayOrder;
