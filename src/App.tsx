import { Layout, List } from "antd";
import * as React from "react";
import "./App.css";
import Header from "./components/Header";
import VexDB from "./components/VexDB";

const { Content } = Layout;

class App extends React.Component {
  public render() {
    return (
      <Layout id="page">
        <Header />
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <VexDB
              endpoint="events"
              args={{
                region: "South Carolina",
                status: "current"
              }}
              header={
                <strong style={{ textAlign: "center" }}>
                  Events Today in South Carolina
                </strong>
              }
              render={(event: any) => (
                <List.Item key={event.key}>
                  {event.name} ({event.sku}) -- {event.loc_city},{" "}
                  {event.loc_region}
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
