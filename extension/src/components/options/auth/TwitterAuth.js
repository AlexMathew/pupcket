import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import firebase from "../firebase";
import "firebase/auth";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  },
});

const provider = new firebase.auth.TwitterAuthProvider();
firebase.auth().useDeviceLanguage();

class TwitterAuth extends React.Component {
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
        Sign in with Twitter
      </Button>
    );
  }
}

TwitterAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TwitterAuth);
