import * as React from "react";
// import VexDB from "src/components/VexDB";
import { Spin, List, Avatar } from "antd";
import { Link } from "react-router-dom";
import * as firebase from "firebase";

export default class TeamPage extends React.Component<any, any> {
  state = {
    team: {} as any,
    members: {} as any,
    claimed: true
  };

  componentWillMount() {
    firebase
      .firestore()
      .collection("teams")
      .doc(this.props.match.params.number)
      .onSnapshot(async doc => {
        if (!doc.exists) {
          this.setState({ claimed: false });
          return;
        }

        this.setState({ team: doc.data() });
        // Update Members
        let data = doc.data();
        if (data) {
          let members = data.members as string[];
          let snaps = await Promise.all(
            members.map(uid =>
              firebase
                .firestore()
                .collection("users")
                .doc(uid)
                .get()
            )
          );
          for (let i = 0; i < snaps.length; i++) {
            let s = snaps[i].data();
            this.setState({
              members: { ...this.state.members, [snaps[i].id]: s }
            });
          }
        }
      });
  }

  render() {
    const { number } = this.props.match.params;

    if (!this.state.team)
      return (
        <Spin
          style={{ margin: "32px auto", textAlign: "center", display: "block" }}
        />
      );

    if (!this.state.claimed) {
      return (
        <div>
          <p>No one has claimed this team yet!</p>
          <Link to={`/claim/${number}`}>Claim this team!</Link>
        </div>
      );
    }

    return (
      <div>
        <div>
          <strong>Robot Description</strong>
          <p>{this.state.team.description}</p>
        </div>
        <div>
          <strong>Autonomous</strong>
          <p>{this.state.team.auton}</p>
        </div>
        <div>
          <strong>Members of {number}</strong>
          <List
            dataSource={Object.keys(this.state.members)}
            renderItem={(uid: string) => (
              <Link to={`/profile/${uid}`}>
                <List.Item>
                  <List.Item.Meta
                    title={this.state.members[uid].name}
                    avatar={<Avatar src={this.state.members[uid].profile} />}
                    description={"Team Member"}
                  />
                </List.Item>
              </Link>
            )}
          />
        </div>
      </div>
    );
  }
}
