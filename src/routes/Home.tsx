import * as React from "react";
import VexDB from "../components/VexDB";
import { List, Icon } from "antd";
import { Link } from "react-router-dom";
import FormattedInput from "src/components/FormattedInput";

export default (props: any) => (
  <VexDB
    endpoint="events"
    args={{
      region: "South Carolina",
      status: "current"
    }}
    header={<strong style={{ textAlign: "center" }}>Events Today</strong>}
    footer={
      <div>
        <FormattedInput
          id="search"
          style={{
            maxWidth: 360,
            marginTop: 8
          }}
          placeholder="Or enter an event SKU"
          suffix={<Icon type="arrow-right" />}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter"
              ? props.history.push(
                  `/event/${(e.nativeEvent.target as any).value}/`
                )
              : null
          }
        />
      </div>
    }
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
