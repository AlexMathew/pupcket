import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { saveMoment } from "../utils/pupcket";

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(30),
    height: theme.spacing(10),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "white",
  },
  success: {
    fill: "rgb(0, 255, 0)",
    background: "rgb(255, 255, 255)",
  },
  failure: {
    fill: "rgb(255, 0, 0)",
    background: "rgb(255, 255, 255)",
  },
});

class Popup extends React.Component {
  state = {
    loading: true,
    saved: false,
  };

  componentDidMount() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const url = tabs[0].url;
      try {
        this.setState({ loading: true });
        await saveMoment(url);
        this.setState({ saved: true });
      } catch (error) {
        this.setState({ saved: false });
      } finally {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        {!this.state.loading && this.state.saved ? (
          <CheckCircleIcon
            style={{ fontSize: 40 }}
            className={classes.success}
          />
        ) : (
          <ErrorIcon style={{ fontSize: 40 }} className={classes.failure} />
        )}
        <Backdrop className={classes.backdrop} open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

export default withStyles(styles)(Popup);
