import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import { red } from "@material-ui/core/colors";
import { Link as RouterLink } from "react-router-dom";
import pupcket from "../../api/pupcket";
import { AUTH_TOKEN_FIELD } from "../../constants";
import { fetchMoments } from "../../utils/pupcket";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    fontSize: theme.spacing(2),
    color: red[500],
  },
});

class SignIn extends React.Component {
  state = {
    username: "",
    password: "",
    error: {
      general: "",
      username: "",
      password: "",
    },
  };

  finishLogin = ({ auth_token, username }) => {
    chrome.storage.local.set({
      [AUTH_TOKEN_FIELD]: { auth_token, username },
    });
    this.props.history.push("/");
    fetchMoments();
  };

  login = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const fields = ["username", "password"];

    pupcket
      .post("/auth/token/login/", {
        username,
        password,
      })
      .then((response) => {
        const { auth_token } = response.data;
        this.finishLogin({ auth_token, username });
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
      });
  };

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Typography component="h4" variant="h6" className={classes.error}>
            {error.general || ""}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.login}>
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
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/signup">
                  Don't have an account? Sign Up
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
