import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
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
  logout: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LoggedIn extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h4" variant="h4">
            Logged in as {this.props.username}.
          </Typography>
          <Button
            className={classes.logout}
            variant="outlined"
            onClick={this.props.logout}
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
