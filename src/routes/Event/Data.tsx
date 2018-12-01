import * as React from "react";
// import VexDB from "src/components/VexDB";
import * as vexdb from "vexdb";
import {
  EventsResponseObject,
  RankingsResponseObject,
  MatchesResponseObject
} from "vexdb/out/constants/ResponseObjects";

import VexDB from "src/components/VexDB";
import { List, Row, Col } from "antd";

export default (sku: string) =>
  class EventData extends React.Component {
    state = {
      event: {} as EventsResponseObject
    };

    async componentWillMount() {
      this.setState({
        event: (await vexdb.get("events" as any, { sku: sku }))[0]
      });
    }

    render() {
      return (
        <Row gutter={16}>
          <Col md={24} lg={12}>
            <VexDB
              endpoint="rankings"
              args={{ sku }}
              header={<strong>Rankings</strong>}
              render={(rank: RankingsResponseObject) => (
                <List.Item>
                  {rank.rank}. {rank.team} ({rank.wins}-{rank.losses}-
                  {rank.ties})
                </List.Item>
              )}
            />
          </Col>
          <Col md={24} lg={12}>
            <VexDB
              endpoint="matches"
              args={{ sku }}
              header={<strong>Matches</strong>}
              render={(match: MatchesResponseObject) => (
                <List.Item>
                  {match.round} {match.instance} {match.matchnum}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      );
    }
  };
