import * as React from "react";
import { Menu, Icon, Affix } from "antd";
import { Route, Link } from "react-router-dom";
import TeamPage from "./Team";
import * as firebase from "firebase";

// import EventData from "./Data";
// import EventNotes from "./Notes";

import * as vexdb from "vexdb";
import { TeamsResponseObject } from "vexdb/out/constants/ResponseObjects";

export default class Team extends React.Component<any, {}> {
  state = {
    team: { team_name: "" } as TeamsResponseObject,
    teamProfile: { members: [] } as firebase.firestore.DocumentData,
    user: {} as firebase.User
  };

  async componentWillMount() {
    firebase
      .firestore()
      .collection("teams")
      .doc(this.props.match.params.number)
      .onSnapshot(doc =>
        this.setState({
          teamProfile: doc.data()
        })
      );

    firebase.auth().onAuthStateChanged(user => this.setState({ user }));

    this.setState({
      team: (await vexdb.get("teams" as any, {
        team: this.props.match.params.number
      }))[0]
    });
  }

  render() {
    let { number } = this.props.match.params;

    return (
      <div>
        <Affix offsetTop={0}>
          <div style={{ backgroundColor: "#fff", padding: "0.5em 0" }}>
            <h2 style={{ marginBottom: 0 }}>
              {this.state.team ? this.state.team.team_name : ""} ({number})
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
            <Menu.Item key={`/team/${number}/data`}>
              <Link to={`/team/${number}/data`}>
                <Icon type="profile" />
                Performance
              </Link>
            </Menu.Item>
            {this.state.teamProfile &&
            this.state.teamProfile.members.includes(this.state.user.uid) ? (
              <Menu.Item key={`/team/${number}/manage`}>
                <Link to={`/team/${number}/manage`}>
                  <Icon type="setting" />
                  Manage
                </Link>
              </Menu.Item>
            ) : null}
          </Menu>
        </Affix>
        <Route exact path={`/team/:number/`} component={TeamPage} />
      </div>
    );
  }
}
