import React, { Component } from "react";
import Filter from "../ProductComponents/Filter";
import Products from "../ProductComponents/Products";
import Shopping from "../ProductComponents/Shopping";

export default class HomeScreen extends Component {
    render() {
      return (
        <div>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <Products></Products>
            </div>
            <div className="sidebar">
              <Shopping />
            </div>
          </div>
        </div>
      );
    }
  }