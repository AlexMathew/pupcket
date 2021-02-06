import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
  popup: {
    display: "flex",
    flexDirection: "column",
  },
  messageSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
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
      <div className={classes.popup}>
        <div className={classes.messageSection}>
          <ErrorIcon className={classes.failure} />
          <Typography variant="subtitle1" className={classes.message}>
            This has already been saved.
          </Typography>
        </div>
        <Button color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ConflictMessage);
