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
    | "skills"
    | "awards";
  args: object;
  header?: React.ReactNode;
  render: React.ReactNode;
}

export default class VexDB extends React.Component<VexDBProps, {}> {
  state = {
    data: [],
    loading: true
  };

  async updateData() {
    this.setState({
      data: await vexdb.get(this.props.endpoint as any, this.props.args),
      loading: false
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
          loading={this.state.loading}
          bordered={true}
          header={this.props.header}
          renderItem={this.props.render}
          pagination={{
            position: "both",
            pageSize: 50,
            hideOnSinglePage: true
          }}
        />
      </div>
    );
  }
}
