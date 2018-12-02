import * as React from "react";
// import VexDB from "src/components/VexDB";
import * as vexdb from "vexdb";
import {
  EventsResponseObject,
  RankingsResponseObject,
  MatchesResponseObject,
  AwardsResponseObject
} from "vexdb/out/constants/ResponseObjects";

import VexDB from "src/components/VexDB";
import { List, Row, Col, Tag } from "antd";

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
        <div>
          <Row gutter={16}>
            <Col md={24} lg={12}>
              <VexDB
                endpoint="rankings"
                args={{ sku, division }}
                header={<strong>Rankings</strong>}
                render={(rank: RankingsResponseObject) => (
                  <List.Item>
                    {rank.rank}. {rank.team} ({rank.wp} / {rank.ap} / {rank.sp})
                  </List.Item>
                )}
              />
              <VexDB
                endpoint="awards"
                args={{ sku }}
                header={<strong>Awards</strong>}
                render={(award: AwardsResponseObject) => (
                  <List.Item>
                    <List.Item.Meta
                      title={award.name}
                      description={award.team}
                    />
                    {award.qualifies.join("<br />")}
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
                    <List.Item.Meta
                      title={matchIdentifier(
                        match.round,
                        match.instance,
                        match.matchnum
                      )}
                      description={
                        <div>
                          <Tag color="red">
                            {match.red1} {match.red2}
                          </Tag>
                          <Tag color="blue">
                            {match.blue1} {match.blue2}
                          </Tag>
                        </div>
                      }
                    />
                    {[
                      <h1 key="red" style={{ color: "#f5222d", marginLeft: 6 }}>
                        {match.redscore}
                      </h1>,
                      <h1
                        key="blue"
                        style={{ color: "#1890ff", marginLeft: 6 }}
                      >
                        {match.bluescore}
                      </h1>
                    ].sort((a, b) => b.props.children - a.props.children)}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      );
    }
  };
