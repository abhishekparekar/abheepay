// Stub – Container is replaced by .container CSS class
import React from "react";
const Container = ({ children, style }) => (
  <div className="container" style={style}>{children}</div>
);
export default Container;
