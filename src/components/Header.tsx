import { Layout } from "antd";
import * as React from "react";
import { Link } from "react-router-component";

const Header = Layout.Header;

export default () => (
  <Header id="header">
    <Link href="/">
      <img src="/assets/logo.svg" alt="Mann Robotics" className="logo" />
    </Link>
    <span className="product">Scout</span>
  </Header>
);
