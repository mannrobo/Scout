import * as React from "react";
// import VexDB from "src/components/VexDB";
import { Row, Col, List, Input, Icon, Avatar, Button } from "antd";

export default (sku: string, divison: string) =>
  class EventNotes extends React.Component {
    render() {
      return (
        <Row>
          <Col lg={12} md={24}>
            <List
              header={<strong>Event Notes</strong>}
              footer={
                <Input
                  placeholder="Leave a Note"
                  suffix={<Icon type="send" />}
                />
              }
              bordered
              renderItem={(item: string) => (
                <List.Item>
                  <List.Item.Meta
                    style={{ flex: 10 }}
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">Brendan McGuire</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <Button icon="delete" shape="circle" />
                </List.Item>
              )}
              dataSource={[""]}
            />
          </Col>
          <Col lg={12} md={24} />
        </Row>
      );
    }
  };
