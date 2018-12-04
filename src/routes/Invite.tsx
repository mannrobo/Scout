import * as React from "react";

export default class InvitePage extends React.Component<any> {
  render() {
    const code = this.props.match.params.code;

    return <p>Using invite code: {code}</p>;
  }
}
