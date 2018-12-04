import { Layout, Spin, Icon } from "antd";
import * as React from "react";
import "./App.css";
import Header from "./components/Header";
import * as firebase from "firebase";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Analytics from "react-router-ga";

// Routes
import AsyncComponent from "./components/Async";

const Home = AsyncComponent(() => import("./routes/Home"));
const Event = AsyncComponent(() => import("./routes/Event"));
const Team = AsyncComponent(() => import("./routes/Team"));
const Login = AsyncComponent(() => import("./routes/Login"));
const Profile = AsyncComponent(() => import("./routes/Profile"));
const Invite = AsyncComponent(() => import("./routes/Invite"));

// Connect to Firebase
var config = {
  apiKey: "AIzaSyAkDVkuP_PFYXRb-xOUxY38bC07IVGR2V8",
  authDomain: "mannrobo-scout.firebaseapp.com",
  databaseURL: "https://mannrobo-scout.firebaseio.com",
  projectId: "mannrobo-scout",
  storageBucket: "",
  messagingSenderId: "999577033624"
};
firebase.initializeApp(config);

// Set default spin
Spin.setDefaultIndicator(<Icon type="loading" style={{ fontSize: 24 }} spin />);

const { Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Analytics id="UA-82048274-3">
          <Layout id="page">
            <Header />
            <Layout>
              <Content style={{ margin: "8px 16px 0" }}>
                <Route exact path="/" component={Home} />
                <Route path="/event/:sku/" component={Event} />
                <Route path="/team/:number/" component={Team} />
                <Route path="/login" component={Login} />
                <Route path="/profile/:uid" component={Profile} />
                <Route path="/i/:code" component={Invite} />
              </Content>
            </Layout>
          </Layout>
        </Analytics>
      </Router>
    );
  }
}

export default App;
