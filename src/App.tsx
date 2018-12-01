import { Layout } from "antd";
import * as React from "react";
import "./App.css";
import Header from "./components/Header";
import { Locations, Location } from "react-router-component";
import Home from "./routes/Home";
import Event from "./routes/Event";
import * as firebase from "firebase";

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

const { Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <Layout id="page">
        <Header />
        <Layout>
          <Content style={{ margin: "8px 16px 0" }}>
            <Locations>
              <Location path="/" handler={Home} />
              <Location path="/event/:sku(/*)" handler={Event} />
            </Locations>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
