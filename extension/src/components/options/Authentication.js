import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// import { AUTH_TOKEN_FIELD } from "../constants";
import Container from "@material-ui/core/Container";
import AuthForm from "./AuthForm";
import { connect } from "react-redux";
// import { signIn } from "../actions";

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
});

class Authentication extends React.Component {
  //   componentDidMount() {
  //     const auth_token = localStorage.getItem(AUTH_TOKEN_FIELD);
  //     if (auth_token) {
  //       this.props.history.push("/");
  //     }
  //   }

  onSubmit = (values) => {
    console.log(values);
    // this.props.signIn(values);
  };

  render() {
    const { classes } = this.props;

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
          <AuthForm onSubmit={this.onSubmit} />
        </div>
      </Container>
    );
  }
}

Authentication.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const wrappedAuthentication = connect(null, { signIn })(Authentication);
const wrappedAuthentication = connect(null)(Authentication);
export default withStyles(styles)(wrappedAuthentication);
