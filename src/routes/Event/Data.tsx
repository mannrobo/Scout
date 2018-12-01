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

function matchIdentifier(round: number, instance: number, matchnum: number) {
  let roundString =
    [
      ,
      "Practice",
      "Qualification",
      "QF",
      "SF",
      "Final",
      "Round of 16",
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      "RR"
    ][round] || round;

  return `${roundString} #${matchnum}${instance != 1 ? `-${instance}` : ""}`;
}

export default (sku: string, division: string) =>
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
              args={{ sku, division }}
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
              args={{ sku, division }}
              header={<strong>Matches</strong>}
              render={(match: MatchesResponseObject) => (
                <List.Item>
                  {matchIdentifier(match.round, match.instance, match.matchnum)}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      );
    }
  };
