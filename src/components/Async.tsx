import * as React from "react";
import { Spin } from "antd";

export type ComponentResolveFunction<P> = () => Promise<
  React.ComponentType<P> | { default: React.ComponentType<P> }
>;

interface AsyncComponentState<P> {
  component: null | React.ComponentType<P>;
}

export default function AsyncComponent<P>(
  resolve: ComponentResolveFunction<P>
): React.ComponentType<P> {
  return class AsyncComponent extends React.Component<
    P,
    AsyncComponentState<P>
  > {
    async componentWillMount() {
      let component = await resolve();
      if (component.hasOwnProperty("default")) {
        component = (component as { default: React.ComponentType<P> }).default;
      }

      this.setState({ component: component as React.ComponentType<P> });
    }

    constructor(props: P) {
      super(props);
      this.state = { component: null };
    }

    render() {
      const C = this.state.component;

      return C ? (
        <C {...this.props} />
      ) : (
        <Spin
          style={{ margin: "32px auto", textAlign: "center", display: "block" }}
        />
      );
    }
  };
}
