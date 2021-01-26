/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders, dispatchOrder } from "../actions/orderAction";
import formatCurrency from "../util";



class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  
  constructor(props) {
    super(props);
  
    this.state = {
      result: '',
    };
  }

  render() {
    const { orders } = this.props;
    
    return !orders ? (
      <div>Orders</div>
    ) : (
      <div className="orders">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADDRESS</th>
              <th>ITEMS</th>
              <th>HAS BEEN SHIPPED</th>

            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td> {formatCurrency(order.total)}</td>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.address}</td>
                <td>
                  {order.shoppingBag.map((item, i) => (
                    <div key={i}>
                      {item.count} {" x "} {item.title}
                    </div>
                  ))}
                </td>
                <td>
                  <input
                    onChange={() => this.props.dispatchOrder(order)}
                    disabled={order.shipped}
                    checked={order.shipped}
                    type="checkbox"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    orders: state.order.orders,
  }),
  {
    fetchOrders,
    dispatchOrder,
  }
)(Orders);