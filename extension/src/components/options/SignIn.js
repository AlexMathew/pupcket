import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Copyright from "./Copyright";
import FirebaseAuth from "./FirebaseAuth";
import { AUTH_TOKEN_FIELD } from "../../constants";

export const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/icons/logo512.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "deepskyblue",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  signin: {
    display: "grid",
    placeItems: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  authBlock: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
});

class SignIn extends React.Component {
  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.signin}
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h4">
              Sign in to Pawcket
            </Typography>
            <div className={classes.authBlock}>
              <FirebaseAuth history={this.props.history} />
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
