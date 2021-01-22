import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { red } from "@material-ui/core/colors";
import Copyright from "./Copyright";
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
  form: {
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
    const { error } = this.state;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Dialog
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            You have successfully registered on Draftnik!
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`${this.state.modalUsername}, you can now sign in to the Draftnik dashboard.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
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
              Sign in
            </Typography>
            <Typography component="h4" variant="h6" className={classes.error}>
              {error.general || ""}
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.submit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) => {
                  this.setState({ username: e.target.value });
                }}
                error={error.username !== undefined && error.username !== ""}
                helperText={error.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                error={error.password !== undefined && error.password !== ""}
                helperText={error.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {this.state.submitting ? (
                  <CircularProgress
                    classes={{
                      root: classes.submitSpinner,
                    }}
                  />
                ) : (
                  "Sign In"
                )}
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
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
