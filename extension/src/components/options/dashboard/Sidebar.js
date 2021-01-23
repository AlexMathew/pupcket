import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import UserCard from "./UserCard";

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: theme.spacing(37.5),
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: theme.spacing(40),
  },
  toolbar: theme.mixins.toolbar,
  logout: {
    color: "black",
  },
});

class Sidebar extends React.Component {
  render() {
    const { classes } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        {this.props.user.username != "" ? (
          <UserCard user={this.props.user} />
        ) : (
          ""
        )}
        <Divider />
        <List>
          <ListItem button onClick={this.props.logout}>
            <ListItemIcon
              classes={{
                root: classes.logout,
              }}
            >
              <ExitToAppIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
