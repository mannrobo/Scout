import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import * as vexdb from "vexdb";
vexdb.constant.settings.headers = {};

ReactDOM.render(<App />, document.getElementById(
  "root"
) as HTMLElement) as React.Component<any, any, any>;
registerServiceWorker();
