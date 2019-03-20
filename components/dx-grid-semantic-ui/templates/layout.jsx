import * as React from "react";

export const Root = ({ styles, ...restProps }) => (
  <div
    styles={{
      display: "flex",
      flexDirection: "column",
      position: "relative",
      ...styles
    }}
    {...restProps}
  />
);
