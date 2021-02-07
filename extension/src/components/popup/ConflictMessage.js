import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deleteMoment } from "../../utils/pupcket";

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
  buttonSpinner: {
    color: "rgb(255, 0, 0)",
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
  },
});

class ConflictMessage extends React.Component {
  status = {
    ACTIVE: "ACTIVE",
    SUBMITTING: "SUBMITTING",
    DELETED: "DELETED",
  };

  state = {
    status: this.status.ACTIVE,
  };

  deleteMoment = async () => {
    const { conflictId } = this.props;
    try {
      this.setState({ status: this.status.SUBMITTING });
      await deleteMoment(conflictId);
      this.setState({ status: this.status.DELETED });
    } catch (error) {
      this.setState({ status: this.status.ACTIVE });
    }
  };

  buttonContent = () => {
    const { classes } = this.props;

    switch (this.state.status) {
      case this.status.ACTIVE:
        return "Delete";
      case this.status.SUBMITTING:
        return (
          <CircularProgress
            classes={{
              root: classes.buttonSpinner,
            }}
          />
        );
      case this.status.DELETED:
        return "Deleted";
    }
  };

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
        <Button
          color="secondary"
          disabled={this.state.status !== this.status.ACTIVE}
          startIcon={
            this.state.status === this.status.ACTIVE ? <DeleteIcon /> : ""
          }
          onClick={this.deleteMoment}
        >
          {this.buttonContent()}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(ConflictMessage);
