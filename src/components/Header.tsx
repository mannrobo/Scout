import { Layout, Menu, Icon } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

window["firebase"] = firebase;

export default class Header extends React.Component {
  state = {
    user: null as null | firebase.User,
    userData: null as any
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot(doc => {
            this.setState({
              userData: doc.data()
            });
          });
      }
    });
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
                  {(this.state.userData || {}).name ||
                    this.state.user.displayName ||
                    "Me"}
                </span>
              }
            >
              <Menu.Item key="user:profile">
                <Link to={`/profile/${this.state.user.uid}`}>My Profile</Link>
              </Menu.Item>
              <Menu.Item key="user:signout">
                <a
                  onClick={e => {
                    e.preventDefault();
                    firebase.auth().signOut();
                  }}
                >
                  Sign Out
                </a>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="team" />
                  {this.state.userData && this.state.userData.team
                    ? this.state.userData.team
                    : "My Team"}
                </span>
              }
            >
              <Menu.Item key="team:profile">
                <Link
                  to={
                    this.state.userData && this.state.userData.team
                      ? `/team/${this.state.userData.team}`
                      : `/team/`
                  }
                >
                  Team Profile
                </Link>
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
