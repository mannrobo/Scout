import * as vexdb from "vexdb";
import { List } from "antd";
import * as React from "react";
import { ResponseObject } from "vexdb/out/constants/ResponseObjects";

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
  footer?: React.ReactNode;
  augment?: (item: ResponseObject) => Promise<any>;
  render: React.ReactNode;
}

export default class VexDB extends React.Component<VexDBProps, {}> {
  state = {
    data: [],
    loading: true
  };

  async updateData() {
    let data = await vexdb.get(this.props.endpoint as any, this.props.args);

    // Augment Data
    if (this.props.augment !== undefined) {
      data = await Promise.all(data.map(this.props.augment));
    }

    this.setState({
      data,
      loading: false
    });
  }

  componentWillMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps: VexDBProps) {
    if (
      prevProps.endpoint != this.props.endpoint ||
      Object.is(this.props.args, prevProps.args)
    ) {
      this.updateData();
    }
  }

  render() {
    return (
      <div style={{ marginBottom: 32 }}>
        <List
          size={"default"}
          dataSource={this.state.data}
          // loading={this.state.loading}
          bordered={true}
          pagination={{
            position: "both",
            pageSize: 50,
            hideOnSinglePage: true
          }}
          renderItem={this.props.render}
          {...this.props}
        />
      </div>
    );
  }
}
