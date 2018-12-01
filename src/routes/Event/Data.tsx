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
      "Prac",
      "Qual",
      "QF",
      "SF",
      "F",
      "R16",
      "R32",
      "R64",
      "R128",
      ,
      ,
      ,
      ,
      ,
      ,
      "RR"
    ][round] || round;

  return `${roundString} #${matchnum}${
    round != 1 && round != 2 ? `-${instance}` : ""
  }`;
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
