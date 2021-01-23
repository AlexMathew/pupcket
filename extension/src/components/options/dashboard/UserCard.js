import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 100,
    alignSelf: "center",
  },
  photo: {
    margin: theme.spacing(1),
    width: theme.spacing(7.5),
    height: theme.spacing(7.5),
  },
  name: {
    fontSize: "medium",
  },
  username: {
    fontSize: "small",
  },
});

class UserCard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.root}>
        <div className={classes.cover}>
          <Avatar src={this.props.user.photo || ""} className={classes.photo} />
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6" className={classes.name}>
              {`Signed in as ${this.props.user.name}`}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.username}
            >
              {this.props.user.username}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);
