import { Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { undraw_page_not_found_re_e9o6 } from "../../util/Images";
import { RouteNames } from "../router/RouteNames";

export const NotFoundSite = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 64px)",
    }}
  >
    <h1 style={{ textAlign: "center" }}>Oops, page not found :(</h1>
    <h3 style={{ textAlign: "center", marginBottom: 50 }}>
      Don't worry, we've got your back!
    </h3>
    <img
      src={undraw_page_not_found_re_e9o6}
      alt="Page not found"
      style={{ maxWidth: 500, marginBottom: 100 }}
    />
    <Link to={RouteNames.LOG_IN}>
      <Button variant="contained">Return Home</Button>
    </Link>
  </div>
);
