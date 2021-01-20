import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
});

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");
firebase.auth().useDeviceLanguage();

class GoogleAuth extends React.Component {
  triggerAuth = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={this.triggerAuth}
      >
        Sign in with Google
      </Button>
    );
  }
}

GoogleAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoogleAuth);
