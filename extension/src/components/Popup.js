import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import SuccessMessage from "./popup/SuccessMessage";
import ErrorMessage from "./popup/ErrorMessage";
import ConflictMessage from "./popup/ConflictMessage";
import { saveMoment } from "../utils/pupcket";

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(35),
    height: theme.spacing(15),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "white",
  },
});

class Popup extends React.Component {
  status = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    CONFLICT: "CONFLICT",
  };

  state = {
    loading: true,
    status: "",
  };

  componentDidMount() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const url = tabs[0].url;
      try {
        this.setState({ loading: true });
        await saveMoment(url);
        this.setState({ status: this.status.SUCCESS });
      } catch (error) {
        if (error.response?.status == 409) {
          this.setState({ status: this.status.CONFLICT });
        } else {
          this.setState({ status: this.status.ERROR });
        }
      } finally {
        this.setState({ loading: false });
      }
    });
  }

  messageSection = () => {
    switch (this.state.status) {
      case this.status.SUCCESS:
        return <SuccessMessage />;
      case this.status.ERROR:
        return <ErrorMessage />;
      case this.status.CONFLICT:
        return <ConflictMessage />;
      default:
        break;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        {this.state.loading ? (
          <Backdrop className={classes.backdrop} open={this.state.loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          this.messageSection()
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Popup);
