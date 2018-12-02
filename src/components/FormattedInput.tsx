import * as React from "react";
import { Input } from "antd";
import InputMask from "react-input-mask";

export default class FormattedInput extends React.Component<any> {
  state = {
    value: ""
  };

  handleInput(e: any) {
    let value = e.target.value;
    this.setState({ value });
  }

  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  render() {
    return (
      <InputMask
        mask="RE-VRC-99-9999"
        value={this.state.value}
        onInput={this.handleInput}
        disabled={false}
        {...this.props}
      >
        {(inputProps: any) => <Input {...inputProps} />}
      </InputMask>
    );
  }
}
