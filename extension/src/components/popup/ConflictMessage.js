import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  failure: {
    fontSize: 40,
    fill: "rgb(255, 0, 0)",
    background: "rgb(255, 255, 255)",
  },
  message: {
    marginLeft: theme.spacing(1),
  },
});

class ConflictMessage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <ErrorIcon className={classes.failure} />
        <Typography variant="subtitle1" className={classes.message}>
          This has already been saved.
        </Typography>
      </>
    );
  }
}

export default withStyles(styles)(ConflictMessage);
