import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(500 + theme.spacing(6))]: {
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
});

class NoMoments extends React.Component {
  TWEETS = [
    "https://twitter.com/dog_feelings/status/1239001599176933378",
    "https://twitter.com/dog_feelings/status/1260008790520262659",
    "https://twitter.com/dog_feelings/status/1250954266321334272",
    "https://twitter.com/dog_feelings/status/1204395239420702722",
    "https://twitter.com/dog_feelings/status/1194607519806525440",
    "https://twitter.com/dog_feelings/status/1184616518946041857",
    "https://twitter.com/dog_feelings/status/1161097625699082245",
    "https://twitter.com/dog_feelings/status/1155817751333654528",
    "https://twitter.com/dog_feelings/status/1141177935249829888",
  ];

  getLink = () => {
    const index = Math.floor(Math.random() * this.TWEETS.length);
    return this.TWEETS[index];
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h5" variant="h5">
            You have no saved moments.
          </Typography>
          <Typography component="h6" variant="h6">
            <Link href={this.getLink()} target="_blank" rel="noopener">
              Maybe a little message to brighten up your day?
            </Link>
          </Typography>
        </Paper>
      </main>
    );
  }
}

NoMoments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoMoments);
