import * as React from "react";
import * as vexdb from "vexdb";
import VexDB from "../components/VexDB";
import { List } from "antd";
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
    return (
      <VexDB
        endpoint="teams"
        args={{
          sku: this.props.sku
        }}
        header={
          <strong style={{ textAlign: "center" }}>
            {this.state.event.name}
          </strong>
        }
        render={(team: any) => (
          <List.Item>
            <List.Item.Meta
              key={team.number}
              title={team.team_name}
              description={<p>{team.number}</p>}
            />
          </List.Item>
        )}
      />
    );
  }
}
