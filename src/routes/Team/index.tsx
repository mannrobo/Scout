import * as React from "react";
import { Menu, Icon, Affix } from "antd";
import { /*Route,*/ Link } from "react-router-dom";
// import EventTeams from "./Teams";
// import EventData from "./Data";
// import EventNotes from "./Notes";

import * as vexdb from "vexdb";
import { TeamsResponseObject } from "vexdb/out/constants/ResponseObjects";

interface TeamProps {
  number: string;
}

export default class Team extends React.Component<TeamProps, {}> {
  state = { team: { team_name: "" } as TeamsResponseObject };

  async componentWillMount() {
    this.setState({
      team: (await vexdb.get("teams" as any, {
        number: this.props.number
      }))[0]
    });
  }

  render() {
    console.log(this.state.team);
    let { number } = this.props;
    return (
      <div>
        <Affix offsetTop={0}>
          <div style={{ backgroundColor: "#fff", padding: "0.5em 0" }}>
            <h2 style={{ marginBottom: 0 }}>
              {this.state.team ? this.state.team.team_name : ""} (
              {this.props.number})
            </h2>
          </div>
          <Menu
            mode="horizontal"
            style={{ marginBottom: 16 }}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key={`/team/${number}`}>
              <Link to={`/team/${number}`}>
                <Icon type="team" />
                Team
              </Link>
            </Menu.Item>
            <Menu.Item key={`/team/${number}/notes`}>
              <Link to={`/team/${number}/notes`}>
                <Icon type="profile" />
                Performance
              </Link>
            </Menu.Item>
          </Menu>
        </Affix>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
          neque maxime, voluptate aliquam aliquid id natus! Placeat eveniet
          saepe aut ipsa earum nemo perspiciatis dignissimos molestiae, alias
          autem enim officia!
        </p>
      </div>
    );
  }
}
