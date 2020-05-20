import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { AUTH_TOKEN_FIELD } from "../../constants";
import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import pupcket from "../../api/pupcket";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
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

class Authentication extends React.Component {
  state = {
    login: 0,
    username: "",
    email: "",
    password: "",
    messages: [],
    error: false,
  };

  componentDidMount() {
    const auth_token = localStorage.getItem(AUTH_TOKEN_FIELD);
    if (auth_token) {
      console.log(auth_token);
    }
  }

  handleTabChange = (event, value) => {
    this.setState({
      login: value,
      username: "",
      password: "",
      email: "",
      messages: [],
      error: false,
    });
  };

  setMessages = (messages) => {
    this.setState({ messages });
  };

  switchToLogin = () => {
    this.handleTabChange(0, 0);
  };

  onError = () => {
    this.setState({ error: true });
  };

  buttonClick = (event) => {
    this.state.login === 0 ? this.login() : this.signup();
  };

  login = () => {
    const fields = ["username", "password", "non_field_errors"];
    const { username, password } = this.state;

    pupcket
      .post("/auth/token/login/", {
        username,
        password,
      })
      .then((data) => {})
      .catch((error) => {
        if (error.response) {
          const data = error.response.data;
          const messages = fields.map((field) => data[field]);
          this.setMessages(messages);
        }
      });
  };

  signup = () => {
    const fields = ["username", "email", "password", "non_field_errors"];
    const { username, email, password } = this.state;

    pupcket
      .post("/auth/users/", {
        username,
        email,
        password,
      })
      .then((data) => {})
      .catch((error) => {
        if (error.response) {
          const data = error.response.data;
          const messages = fields.map((field) => data[field]);
          this.setMessages(messages);
        }
      });
  };

  render() {
    const { classes } = this.props;
    const { login, username, email, password, messages, error } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <AppBar position="static" style={{ marginBottom: 20 }}>
            <Tabs
              variant="fullWidth"
              value={login}
              onChange={this.handleTabChange}
            >
              <Tab
                component="a"
                onClick={(event) => event.preventDefault()}
                label="Log In"
                href="login"
              />
              <Tab
                component="a"
                onClick={(event) => event.preventDefault()}
                label="Sign Up"
                href="signup"
              />
            </Tabs>
          </AppBar>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {login === 0 ? "Log in" : "Sign up"}
          </Typography>
          {messages.map((message) => (
            <Typography component="h4" variant="h6" className={classes.error}>
              {message || ""}
            </Typography>
          ))}
          {error ? (
            <Typography component="h4" variant="h6" className={classes.error}>
              {login === 0 ? "Invalid credentials" : "Username already in use"}
            </Typography>
          ) : (
            ""
          )}
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </FormControl>
          {login === 1 ? (
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </FormControl>
          ) : (
            ""
          )}
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => this.buttonClick()}
          >
            {login === 0 ? "Log In" : "Sign Up"}
          </Button>
        </Paper>
      </main>
    );
  }
}

Authentication.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Authentication);
