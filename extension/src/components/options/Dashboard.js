import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./dashboard/Header";
import Sidebar from "./dashboard/Sidebar";
import {
  AUTH_TOKEN_FIELD,
  MOMENTS_STORAGE_FIELD,
  MOMENTS_COUNT_FIELD,
} from "../../constants";
import { auth } from "./firebase";

const styles = (theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexGrow: 1,
    },
    display: "grid",
  },
});

class Dashboard extends React.Component {
  state = {};

  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.setState({ username: token.username });
      } else {
        this.props.history.push("/signin");
      }
    });
  }

  logout = () => {
    chrome.storage.local.remove([
      AUTH_TOKEN_FIELD,
      MOMENTS_STORAGE_FIELD,
      MOMENTS_COUNT_FIELD,
    ]);
    this.setState({});
    auth.signOut();
    this.props.history.push("/signin");
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <Sidebar logout={this.logout} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
