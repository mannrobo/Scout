import * as React from "react";
import * as vexdb from "vexdb";
import {
  EventsResponseObject,
  RankingsResponseObject,
  AwardsResponseObject
} from "vexdb/out/constants/ResponseObjects";

// import VexDB from "src/components/VexDB";
import { Row, Col, List, Select } from "antd";
import VexDB from "src/components/VexDB";
import { Link } from "react-router-dom";

function eventPerformanceSummary(
  event: EventsResponseObject & {
    rank: RankingsResponseObject;
    awards: AwardsResponseObject[];
  }
) {
  let rank,
    awards = "";

  if (event.rank) {
    rank = `Ranked ${event.rank.rank}. `;
  } else {
    rank = "Unranked. ";
  }

  awards =
    event.awards.length > 0
      ? `${event.awards.map(a => a.name.split(" (")[0]).join(", ")}`
      : "";

  return rank + awards;
}

export default class EventData extends React.Component<any> {
  state = {
    event: {} as EventsResponseObject,
    season: "current"
  };

  async componentWillMount() {}

  augmentEvent = async (item: EventsResponseObject) => {
    return {
      ...item,
      rank: (await vexdb.get("rankings", {
        team: this.props.match.params.number,
        sku: item.sku
      }))[0],
      awards: await vexdb.get("awards", {
        team: this.props.match.params.number,
        sku: item.sku
      })
    };
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col md={24} lg={12}>
            <VexDB
              header={<strong>Events</strong>}
              footer={
                <Select
                  style={{ width: "50%" }}
                  defaultValue="current"
                  value={this.state.season}
                  onChange={season => {
                    this.setState({ season });
                  }}
                >
                  <Select.Option value="current">Turning Point</Select.Option>
                  <Select.Option value="In The Zone">In The Zone</Select.Option>
                  <Select.Option value="Starstruck">Starstruck</Select.Option>
                  <Select.Option value="Nothing But Net">
                    Nothing But Net
                  </Select.Option>
                  <Select.Option value="Skyrise">Skyrise</Select.Option>
                </Select>
              }
              endpoint={"events"}
              args={{
                team: this.props.match.params.number,
                season: this.state.season
              }}
              augment={this.augmentEvent}
              render={(
                event: EventsResponseObject & {
                  rank: RankingsResponseObject;
                  awards: AwardsResponseObject[];
                }
              ) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Link to={`/event/${event.sku}`}>{event.name}</Link>}
                    description={eventPerformanceSummary(event)}
                  />
                  {event.rank.wins}-{event.rank.losses}-{event.rank.ties}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
