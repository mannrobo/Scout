import * as React from "react";
// import VexDB from "src/components/VexDB";
import * as vexdb from "vexdb";
import {
  EventsResponseObject,
  RankingsResponseObject,
  AwardsResponseObject
} from "vexdb/out/constants/ResponseObjects";

import VexDB from "src/components/VexDB";
import { List, Row, Col } from "antd";

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
          </Row>
        </div>
      );
    }
  };
