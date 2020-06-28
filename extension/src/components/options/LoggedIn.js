import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  AUTH_TOKEN_FIELD,
  MOMENTS_STORAGE_FIELD,
  MOMENTS_COUNT_FIELD,
} from "../../constants";
import { fetchMoments } from "../../utils/pupcket";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  logout: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoggedIn extends React.Component {
  state = {
    username: "",
  };

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

  login = ({ auth_token, username }) => {
    chrome.storage.local.set({
      [AUTH_TOKEN_FIELD]: { auth_token, username },
    });
    this.setState({ authenticated: true, username: username });
    fetchMoments();
  };

  logout = () => {
    chrome.storage.local.remove([
      AUTH_TOKEN_FIELD,
      MOMENTS_STORAGE_FIELD,
      MOMENTS_COUNT_FIELD,
    ]);
    this.setState({ username: "" });
    this.props.history.push("/signin");
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h4">
            Logged in as {this.state.username}.
          </Typography>
          <Button
            className={classes.logout}
            variant="outlined"
            onClick={this.logout}
          >
            Log out
          </Button>
        </Paper>
      </main>
    );
  }
}

LoggedIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoggedIn);
