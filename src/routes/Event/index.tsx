import * as React from "react";
import { Menu, Icon, Affix } from "antd";
import { Locations, Location, Link } from "react-router-component";
import EventTeams from "./Teams";
import EventData from "./Data";

import * as vexdb from "vexdb";
import { EventsResponseObject } from "vexdb/out/constants/ResponseObjects";

interface EventProps {
  sku: string;
}

export default class Event extends React.Component<EventProps, {}> {
  state = {
    event: {} as EventsResponseObject
  };

  async componentWillMount() {
    this.setState({
      event: (await vexdb.get("events" as any, { sku: this.props.sku }))[0]
    });
  }

  render() {
    let { sku } = this.props;
    return (
      <div>
        <Affix offsetTop={0}>
          <div style={{ backgroundColor: "#fff", padding: "0.5em 0" }}>
            <h2 style={{ marginBottom: 0 }}>{this.state.event.name}</h2>
          </div>
          <Menu
            mode="horizontal"
            style={{ marginBottom: 16 }}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key={`/event/${sku}`}>
              <Link href={`/event/${sku}`}>
                <Icon type="team" />
                Teams
              </Link>
            </Menu.Item>
            <Menu.Item key={`/event/${sku}/data`}>
              <Link href={`/event/${sku}/data`}>
                <Icon type="rise" />
                Data
              </Link>
            </Menu.Item>
            <Menu.Item key={`/event/${sku}/notes`}>
              <Link href={`/event/${sku}/notes`}>
                <Icon type="profile" />
                Notes
              </Link>
            </Menu.Item>
          </Menu>
        </Affix>
        <Locations contextual>
          <Location path="/" handler={EventTeams(this.props.sku)} />
          <Location path="/data" handler={EventData(this.props.sku)} />
          <Location path="/notes" handler={EventTeams(this.props.sku)} />
        </Locations>
      </div>
    );
  }
}
