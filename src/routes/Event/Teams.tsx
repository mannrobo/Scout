import * as React from "react";
import VexDB from "src/components/VexDB";
import { List } from "antd";

export default (sku: string) =>
  class EventTeams extends React.Component {
    render() {
      return (
        <VexDB
          endpoint="teams"
          args={{ sku }}
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
  };
