import * as React from "react";
// import VexDB from "src/components/VexDB";
import {
  List,
  Avatar,
  Button,
  Row,
  Col,
  Popconfirm,
  Icon,
  Input,
  Form
} from "antd";
import * as copy from "copy-to-clipboard";
import * as firebase from "firebase/app";
import "firebase/firestore";

export default class TeamManage extends React.Component<any> {
  state = {
    members: {} as any,
    team: {} as any,
    invite: ""
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

    firebase
      .firestore()
      .collection("invite")
      .doc(this.props.match.params.number)
      .onSnapshot(snap =>
        this.setState({
          invite: snap.exists
            ? `https://scout.mannrobo.org/invite/${(snap.data() as any).code}`
            : ""
        })
      );
  }

  render() {
    return (
      <Row gutter={16}>
        <Col sm={24} lg={8} style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 16, textAlign: "center" }}>
            <strong>Manage Team Members</strong>
          </div>
          <List
            dataSource={Object.keys(this.state.members)}
            renderItem={(uid: string) => (
              <List.Item>
                <List.Item.Meta
                  title={this.state.members[uid].name}
                  avatar={<Avatar src={this.state.members[uid].profile} />}
                  description={"Team Member"}
                />
                <Popconfirm
                  title="Remove this person from the team?"
                  okText="Yes"
                  cancelText={"No"}
                  icon={
                    <Icon
                      type="question-circle-o"
                      style={{ color: "#f5222d" }}
                    />
                  }
                >
                  <Button icon="close" shape="circle" />
                </Popconfirm>
              </List.Item>
            )}
            footer={
              <div>
                <Input
                  value={this.state.invite}
                  suffix={
                    <Button
                      type="primary"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        position: "relative",
                        left: 12
                      }}
                      onClick={() => copy(this.state.invite)}
                    >
                      <Icon type="copy" />
                      Copy
                    </Button>
                  }
                />
                <p style={{ textAlign: "right", marginTop: 12 }}>
                  <Popconfirm
                    title="This will invalidate the old link"
                    okText="Generate"
                  >
                    <Button>Generate New Invite Link</Button>
                  </Popconfirm>
                </p>
              </div>
            }
          />
        </Col>
        <Col sm={24} lg={15}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <strong>Update Team Info</strong>
          </div>
          <Form layout="vertical">
            <Form.Item>
              <label htmlFor="team-description">Description of Robot</label>
              <Input.TextArea
                id="team-description"
                placeholder="Description of Robot"
                value={this.state.team.description}
              />
            </Form.Item>
            <Form.Item>
              <label htmlFor="team-description">
                Description of Autonomous
              </label>
              <Input.TextArea
                id="team-auton"
                placeholder="Description of Autonomous"
                value={this.state.team.auton}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}
