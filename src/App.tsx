import { Layout } from "antd";
import * as React from "react";
import "./App.css";
import Header from "./components/Header";
import { Locations, Location } from "react-router-component";
import Home from "./routes/Home";
import Event from "./routes/Event";

const { Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <Layout id="page">
        <Header />
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <Locations>
              <Location path="/" handler={Home} />
              <Location path="/event/:sku" handler={Event} />
            </Locations>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
