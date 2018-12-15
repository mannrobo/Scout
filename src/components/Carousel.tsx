import * as React from "react";
import { Carousel } from "antd";

export default (props: { images: string[] } & any) => (
  <Carousel {...props}>
    {props.images.map((img: string) => (
      <div>
        <img src={img} />
      </div>
    ))}
    <div style={{ width: "100%" }}>
      <h1>+</h1>
    </div>
  </Carousel>
);
