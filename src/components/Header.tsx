import { Layout } from "antd";
import * as React from "react";

const Header = Layout.Header;

export default () => (
  <Header id="header">
    <img src="/assets/logo.svg" alt="Mann Robotics" className="logo" />
    <span className="product">Scout</span>
  </Header>
);
