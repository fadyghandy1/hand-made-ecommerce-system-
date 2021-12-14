import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//, useParams, useHistory, location
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { addToCart, removeFromCart } from "../../actions/cartAction";
import { ProductSearch } from "../productSearch/productSearch";
import "./cart.scss";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";

function Cart({ match, location, history }) {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cartReducer);
    const { cartItems } = cart;
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeCartItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkout = () => {
        history.push("/login?redirect=shipping");
    };
    return (
      <>
      <Navbar />
<ProductSearch/>
  <div className="py-5 my-5">
        <Container>
            <Row>
                <Col md={8}>
                    <h1 className="cart-header">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <h2>
                            Your Cart Is Empty <Link to="/">Go Back</Link>
                        </h2>
                    ) : (
                        <ListGroup variant='flush'>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.id} variant=' my-3'>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.id}`} className="product-link">
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.id, Number(e.target.value)))}
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="button" variant="light" onClick={() => removeCartItem(item.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col md={4}  >
                    <Card >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2 className="subtotal">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>$
                                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item className="text-center">
                                <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkout}>
                                    Proceed To Checkout{" "}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
          
            </Row>
        </Container>
    </div>   
    <Footer />
      </>  
    );

}

export default Cart;
