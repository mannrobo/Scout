import * as React from "react";
import * as firebase from "firebase";
import { Spin, Select, Button, Affix, Input, List, Avatar } from "antd";
import { Link } from "react-router-dom";
import FourOhFour from "src/components/FourOhFour";

export default class ProfilePage extends React.Component<any> {
  state = {
    loggedInUser: null as firebase.User | null,
    teams: [],
    user: {
      loaded: false,
      data: null as any
    },
    editMode: false
  };

  componentWillMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.uid)
      .onSnapshot(doc => {
        this.setState({
          user: {
            loaded: true,
            data: doc.data()
          }
        });
      });

    firebase.auth().onAuthStateChanged(loggedInUser => {
      this.setState({ loggedInUser });
    });

    firebase
      .firestore()
      .collection("teams")
      .where("members", "array-contains", this.props.match.params.uid)
      .onSnapshot(query => {
        this.setState({ teams: query.docs.map(doc => doc.id) });
      });
  }

  updateProfileValue(key: string) {
    return (value: any) =>
      this.setState({
        user: {
          data: {
            ...this.state.user.data,
            [key]: value
          },
          loaded: true
        }
      });
  }

  saveProfile() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.match.params.uid)
      .update(this.state.user.data);
  }

  constructor(props: any) {
    super(props);
    this.updateProfileValue = this.updateProfileValue.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
  }

  render() {
    const canEdit =
      this.state.loggedInUser &&
      this.props.match.params.uid === this.state.loggedInUser.uid;

    if (!this.state.user.loaded)
      return (
        <Spin
          style={{ margin: "32px auto", textAlign: "center", display: "block" }}
        />
      );

    if (!this.state.user.data) return <FourOhFour />;

    return (
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "16px" }}>
        <Affix offsetTop={10}>
          <div className="fixed-actions">
            {canEdit ? (
              <Button
                style={{ marginRight: "auto" }}
                shape="circle"
                icon={this.state.editMode ? "save" : "edit"}
                onClick={() => {
                  this.setState({ editMode: !this.state.editMode });
                  if (this.state.editMode) this.saveProfile();
                }}
              />
            ) : null}
            {(navigator as any).share ? (
              <Button
                style={{ marginRight: "auto" }}
                shape="circle"
                icon="share-alt"
                onClick={() =>
                  (navigator as any).share({
                    title: this.state.user.data.name,
                    text: `${this.state.user.data.name} on Scout`,
                    url: location.href
                  })
                }
              />
            ) : null}
          </div>
        </Affix>
        <div style={{ textAlign: "center" }}>
          <Avatar src={this.state.user.data.profile} alt="Profile Picture" />
          {this.state.editMode ? (
            <Input
              value={this.state.user.data.name}
              onChange={e => this.updateProfileValue("name")(e.target.value)}
              style={{ margin: "16px 0" }}
            />
          ) : (
            <h1>{this.state.user.data.name}</h1>
          )}
          {this.state.editMode ? (
            <Select
              style={{ width: 120 }}
              value={this.state.user.data.team}
              onChange={value => this.updateProfileValue("team")(value)}
            >
              {this.state.teams.map(team => (
                <Select.Option key={team} value={team}>
                  {team}
                </Select.Option>
              ))}
            </Select>
          ) : (
            this.state.user.data.team
          )}
          <div style={{ textAlign: "left", marginTop: 32 }}>
            <strong>{this.state.user.data.name}'s Teams</strong>
          </div>
          <List
            renderItem={(team: string) => (
              <List.Item>
                <Link to={`/team/${team}`}>{team}</Link>
              </List.Item>
            )}
            dataSource={this.state.teams}
          />
        </div>
      </div>
    );
  }
}
