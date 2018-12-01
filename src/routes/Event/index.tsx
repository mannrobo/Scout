import * as React from "react";
import { Menu, Icon, Affix, Select } from "antd";
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
    event: { name: "" } as EventsResponseObject,
    divisionSelection:
      localStorage.getItem(`divisionChoice-${this.props.sku}`) || ""
  };

  async componentWillMount() {
    this.setState(
      {
        event: (await vexdb.get("events" as any, {
          sku: this.props.sku
        }))[0]
      },
      () => {
        if (!this.state.divisionSelection) {
          this.setState({
            divisionSelection: this.state.event.divisions[0]
          });
        }
      }
    );
  }

  componentDidUpdate() {
    localStorage.setItem(
      `divisionChoice-${this.props.sku}`,
      this.state.divisionSelection
    );
  }

  render() {
    let { sku } = this.props;
    return (
      <div>
        <Affix offsetTop={0}>
          <div style={{ backgroundColor: "#fff", padding: "0.5em 0" }}>
            <h2 style={{ marginBottom: 0 }}>
              {this.state.event ? this.state.event.name : ""}
            </h2>
            {this.state.event.name != "" &&
            this.state.event.divisions.length > 1 ? (
              <Select
                onChange={divisionSelection =>
                  this.setState({ divisionSelection })
                }
                style={{ width: 180, marginTop: 8 }}
                defaultValue={
                  this.state.divisionSelection || this.state.event.divisions[0]
                }
              >
                {this.state.event.divisions.map(div => (
                  <Select.Option value={div}>{div}</Select.Option>
                ))}
              </Select>
            ) : null}
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
          <Location
            path="/"
            handler={EventTeams(this.props.sku, this.state.divisionSelection)}
          />
          <Location
            path="/data"
            handler={EventData(this.props.sku, this.state.divisionSelection)}
          />
          <Location
            path="/notes"
            handler={EventTeams(this.props.sku, this.state.divisionSelection)}
          />
        </Locations>
      </div>
    );
  }
}
