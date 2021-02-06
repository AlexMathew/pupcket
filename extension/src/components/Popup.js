import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import SuccessMessage from "./popup/SuccessMessage";
import ErrorMessage from "./popup/ErrorMessage";
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
});

class Popup extends React.Component {
  state = {
    loading: true,
    saved: false,
    errorMessage: "Error.",
  };

  componentDidMount() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const url = tabs[0].url;
      try {
        this.setState({ loading: true });
        await saveMoment(url);
        this.setState({ saved: true });
      } catch (error) {
        if (error.response?.status == 409) {
          this.setState({
            errorMessage: "This has already been saved.",
          });
        } else {
          this.setState({ errorMessage: "Error." });
        }
        this.setState({ saved: false });
      } finally {
        this.setState({ loading: false });
      }
    });
  }

  messageSection = () => {
    return this.state.saved ? <SuccessMessage /> : <ErrorMessage />;
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
