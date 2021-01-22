import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

class Copyright extends React.Component {
  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://getpawcket.com/">
          Pawcket
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
}

export default Copyright;
