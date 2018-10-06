import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

class MenuComponent extends Component {
  render() {
    return (
      <div
        style={{
          width: "200px",
          marginRight: "10px",
          borderRight: "solid black 1px"
        }}
      >
        <Typography variant="headline">Menu</Typography>
        <MenuList style={{ marginRight: "1vw" }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/list/"}
          >
            <MenuItem>See all proposals</MenuItem>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={"/form/"}
          >
            <MenuItem>Create new proposal</MenuItem>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
            <MenuItem>Something else</MenuItem>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
            <MenuItem>My contracts</MenuItem>
          </Link>
        </MenuList>
      </div>
    );
  }
}

export default MenuComponent;
