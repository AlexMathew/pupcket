import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Copyright from "./Copyright";
import FirebaseAuth from "./FirebaseAuth";
import pupcket from "../../api/pupcket";
import { AUTH_TOKEN_FIELD } from "../../constants";
import { fetchMoments } from "../../utils/pupcket";
// import GoogleAuth from "./auth/GoogleAuth";
// import TwitterAuth from "./auth/TwitterAuth";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
    display: "grid",
    placeItems: "center",
  },
  error: {
    fontSize: theme.spacing(2),
    color: red[500],
  },
  submitSpinner: {
    color: "white",
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
  },
});

class SignIn extends React.Component {
  state = {
    modalOpen: false,
    modalUsername: "",
    username: "",
    password: "",
    error: {
      general: "",
      username: "",
      password: "",
    },
    submitting: false,
  };

  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.props.history.push("/");
      }
    });

    const state = this.props.location.state;
    if (state) {
      if (state.success) {
        this.setState({
          modalOpen: true,
          modalUsername: state.username,
        });
      }
    }
  }

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  onSubmitSuccess = (input, response) => {
    const { username } = input;
    const { auth_token } = response.data;
    chrome.storage.local.set({
      [AUTH_TOKEN_FIELD]: { auth_token, username },
    });
    this.props.history.push("/");
    fetchMoments();
  };

  submit = (event) => {
    event.preventDefault();
    this.setState({ submitting: true });
    const { username, password } = this.state;
    const fields = ["username", "password"];

    pupcket
      .post("/auth/token/login/", {
        username,
        password,
      })
      .then((response) => {
        this.onSubmitSuccess({ username }, response);
      })
      .catch((err) => {
        if (err.response) {
          const error = {};
          const data = err.response.data;
          error.general = data.non_field_errors;
          fields.forEach((field) => {
            error[[field]] = (data[[field]] || []).join(" ");
          });
          this.setState({ error });
        }
      })
      .finally(() => {
        this.setState({ submitting: false });
      });
  };

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
              <FirebaseAuth />
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
