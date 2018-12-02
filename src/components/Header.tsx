import { Layout, Menu, Icon } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

export default class Header extends React.Component {
  state = {
    user: null as null | firebase.User
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    return (
      <Layout.Header
        id="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          height: "unset",
          paddingRight: 32
        }}
      >
        <div>
          <Link to="/">
            <img src="/assets/logo.svg" alt="Mann Robotics" className="logo" />
          </Link>
          <span className="product">Scout</span>
        </div>

        {this.state.user ? (
          <Menu
            mode={window.innerWidth > 550 ? "horizontal" : "inline"}
            selectedKeys={[]}
            style={{ borderWidth: 0 }}
          >
            <Menu.SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="user" />
                  {this.state.user.displayName}
                </span>
              }
            >
              <Menu.Item key="user:profile">
                <Link to="/profile">My Profile</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="team" />
                  My Team
                </span>
              }
            >
              <Menu.Item key="team:profile">
                <Link to="/profile">Team Profile</Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </Layout.Header>
    );
  }
}
