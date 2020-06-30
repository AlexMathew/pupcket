import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
  options: {
    margin: theme.spacing(3, 0, 2),
  },
});

class NotAuthenticated extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h5" variant="h5">
            You are not authenticated.
          </Typography>
          <Button
            className={classes.options}
            variant="outlined"
            onClick={() => {
              chrome.runtime.openOptionsPage();
            }}
          >
            Head over to auth!
          </Button>
        </Paper>
      </main>
    );
  }
}

NotAuthenticated.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotAuthenticated);
