import { Layout } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";

const Header = Layout.Header;

export default () => (
  <Header id="header">
    <Link to="/">
      <img src="/assets/logo.svg" alt="Mann Robotics" className="logo" />
    </Link>
    <span className="product">Scout</span>
  </Header>
);
