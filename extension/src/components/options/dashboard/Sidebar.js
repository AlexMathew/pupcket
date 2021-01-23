import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

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
});

class Sidebar extends React.Component {
  render() {
    const { classes } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
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
