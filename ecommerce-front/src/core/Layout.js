import React from "react";
import Menu from "./Menu";
import "../dist/css/styles.css";
const Layout = ({
  title = "Tilte",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron ">
      <div className="container">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
);
export default Layout;
