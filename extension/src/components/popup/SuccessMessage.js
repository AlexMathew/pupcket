import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  success: {
    fontSize: 40,
    fill: "rgb(0, 255, 0)",
    background: "rgb(255, 255, 255)",
  },
  message: {
    marginLeft: theme.spacing(1),
  },
});

class SuccessMessage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <>
        <CheckCircleIcon className={classes.success} />
        <Typography variant="h6" className={classes.message}>
          Saved.
        </Typography>
      </>
    );
  }
}

export default withStyles(styles)(SuccessMessage);
