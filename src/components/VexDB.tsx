import * as vexdb from "vexdb";
import { List } from "antd";
import * as React from "react";

export interface VexDBProps {
  endpoint:
    | "teams"
    | "events"
    | "matches"
    | "rankings"
    | "season_rankings"
    | "skills";
  args: object;
  header?: React.ReactNode;
  render: React.ReactNode;
}

export default class VexDB extends React.Component<VexDBProps, {}> {
  state = {
    data: []
  };

  async updateData() {
    this.setState({
      data: await vexdb.get(this.props.endpoint as any, this.props.args)
    });
  }

  componentWillMount() {
    this.updateData();
  }
  componentWillReceiveProps() {
    this.updateData();
  }

  render() {
    return (
      <div style={{ marginBottom: 32 }}>
        <List
          size={"default"}
          dataSource={this.state.data}
          bordered={true}
          header={this.props.header}
          renderItem={this.props.render}
        />
      </div>
    );
  }
}
