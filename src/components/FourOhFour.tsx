import * as React from "react";
import Exception from "ant-design-pro/lib/Exception";

export default ({ title, desc }: { title?: string; desc?: string }) => (
  <Exception
    type="404"
    title={title || "404"}
    desc={desc || "That page could not be found"}
    img={"/assets/exception/404.svg"}
    actions={<p />}
  />
);
