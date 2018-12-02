import * as React from "react";
import VexDB from "../components/VexDB";
import { List } from "antd";
import { Link } from "react-router-dom";

export default () => (
  <VexDB
    endpoint="events"
    args={{
      region: "South Carolina",
      status: "current"
    }}
    header={<strong style={{ textAlign: "center" }}>Events Today</strong>}
    render={(event: any) => (
      <Link to={`/event/${event.sku}/`}>
        <List.Item>
          <List.Item.Meta
            key={event.key}
            title={event.name}
            description={
              <p>
                {event.loc_venue}, {event.loc_city}
              </p>
            }
          />
        </List.Item>
      </Link>
    )}
  />
);
