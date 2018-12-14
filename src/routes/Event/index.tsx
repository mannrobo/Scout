import * as React from "react";
import { Menu, Icon, Affix, Select } from "antd";
import EventTeams from "./Teams";
import EventData from "./Data";
import EventNotes from "./Notes";
import { Link, Route } from "react-router-dom";

import FourOhFour from "../../components/FourOhFour";

import * as vexdb from "vexdb";
import { EventsResponseObject } from "vexdb/out/constants/ResponseObjects";

export default class Event extends React.Component<any, {}> {
  state = {
    event: { name: "" } as EventsResponseObject,
    divisionSelection:
      localStorage.getItem(`divisionChoice-${this.props.match.params.sku}`) ||
      ""
  };

  async componentWillMount() {
    this.setState(
      {
        event: (await vexdb.get("events" as any, {
          sku: this.props.match.params.sku
        }))[0]
      },
      () => {
        if (!this.state.divisionSelection && this.state.event) {
          this.setState({
            divisionSelection: this.state.event.divisions[0]
          });
        }
      }
    );
  }

  componentDidUpdate() {
    localStorage.setItem(
      `divisionChoice-${this.props.match.params.sku}`,
      this.state.divisionSelection
    );
  }

  render() {
    let { sku } = this.props.match.params;

    if (!this.state.event) return <FourOhFour />;

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
            <Menu.Item key={`/event/${sku}/`}>
              <Link to={`/event/${sku}/`}>
                <Icon type="team" />
                Teams
              </Link>
            </Menu.Item>
            <Menu.Item key={`/event/${sku}/data`}>
              <Link to={`/event/${sku}/data`}>
                <Icon type="rise" />
                Data
              </Link>
            </Menu.Item>
            <Menu.Item key={`/event/${sku}/notes`}>
              <Link to={`/event/${sku}/notes`}>
                <Icon type="profile" />
                Notes
              </Link>
            </Menu.Item>
          </Menu>
        </Affix>

        <Route
          exact
          path={`/event/${sku}/`}
          component={EventTeams(
            this.props.match.params.sku,
            this.state.divisionSelection
          )}
        />
        <Route
          exact
          path={`/event/${sku}/data`}
          component={EventData(
            this.props.match.params.sku,
            this.state.divisionSelection
          )}
        />
        <Route
          exact
          path={`/event/${sku}/notes`}
          component={EventNotes(
            this.props.match.params.sku,
            this.state.divisionSelection
          )}
        />
      </div>
    );
  }
}
