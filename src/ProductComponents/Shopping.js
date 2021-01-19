import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { removeFromBasket } from "../actions/basketAction"
import { clearOrder, createOrder } from '../actions/orderAction';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom"; 

class Shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false,
        };
    }
    handleInput = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    };
    createOrder = (e) => {
      e.preventDefault();
      const order = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        shoppingBag: this.props.shoppingBag,
        total: this.props.shoppingBag.reduce((a, c) => a + c.price * c.count, 0),
      };
      this.props.createOrder(order);
    };
    closeModal = () => {
      this.props.clearOrder();
    };
    render() {
      const { shoppingBag, order } = this.props;
      return (
        <div>
          {shoppingBag.length === 0 ? (
            <div className="shopping shopping-header"> Basket is empty</div>
          ) : (
            <div className="shopping shopping-header">
              You have {shoppingBag.length} in the Basket {" "}
            </div>
          )}
  
          {order && (
            <Modal isOpen={true} onRequestClose={this.closeModal}>
              <Zoom>
                <button className="close-modal" onClick={this.closeModal}>
                  x
                </button>
                <div className="order-details">
                  <h3 className="success-message">Your order has been placed.</h3>
                  <h2>Order {order._id}</h2>
                  <ul>
                    <li>
                      <div>Name:</div>
                      <div>{order.name}</div>
                    </li>
                    <li>
                      <div>Email:</div>
                      <div>{order.email}</div>
                    </li>
                    <li>
                      <div>Address:</div>
                      <div>{order.address}</div>
                    </li>
                    <li>
                      <div>Date:</div>
                      <div>{order.createdAt}</div>
                    </li>
                    <li>
                      <div>Total:</div>
                      <div>{formatCurrency(order.total)}</div>
                    </li>
                    <li>
                      <div>Bag Items:</div>
                      <div>
                        {order.shoppingBag.map((x) => (
                          <div>
                            {x.count} {" x "} {x.title}
                          </div>
                        ))}
                      </div>
                    </li>
                  </ul>
                </div>
              </Zoom>
            </Modal>
          )}
          <div>
            <div className="shopping">
              <Fade left cascade>
                <ul className="shopping-items">
                  {shoppingBag.map((item) => (
                    <li key={item._id}>
                      <div>
                        <img src={item.image} alt={item.title}></img>
                      </div>
                      <div>
                        <div>{item.title}</div>
                        <div className="right">
                          {formatCurrency(item.price)} x {item.count}{" "}
                          <button
                            className="button"
                            onClick={() => this.props.removeFromBasket(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
            {shoppingBag.length !== 0 && (
              <div>
                <div className="shopping">
                  <div className="total">
                    <div>
                      Total:{" "}
                      {formatCurrency(
                        shoppingBag.reduce((a, c) => a + c.price * c.count, 0)
                      )}
                    </div>
                    <button
                      onClick={() => {
                        this.setState({ showCheckout: true });
                      }}
                      className="button primary"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
                {this.state.showCheckout && (
                  <Fade right cascade>
                    <div className="shopping">
                      <form onSubmit={this.createOrder}>
                        <ul className="form-container">
                          <li>
                            <label>Email</label>
                            <input
                              name="email"
                              type="email"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>
                          <li>
                            <label>Name</label>
                            <input
                              name="name"
                              type="text"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>
                          <li>
                            <label>Address</label>
                            <input
                              name="address"
                              type="text"
                              required
                              onChange={this.handleInput}
                            ></input>
                          </li>
                          <li>
                            <button className="button primary" type="submit">
                              Checkout
                            </button>
                          </li>
                        </ul>
                      </form>
                    </div>
                  </Fade>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
  }
  
  export default connect(
    (state) => ({
      order: state.order.order,
      shoppingBag: state.shopping.shoppingBag,
    }),
    { removeFromBasket, createOrder, clearOrder }
  )(Shopping);