import React from 'react';
import { FuseSearch } from '@fuse';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { AppBar, Hidden, MuiThemeProvider, Toolbar, withStyles } from '@material-ui/core';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';

const styles = theme => ({
  separator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider
  }
});

const ToolbarLayout1 = ({ classes, settings, toolbarTheme }) => {
  const layoutConfig = settings.layout.config;

  return (
    <MuiThemeProvider theme={toolbarTheme}>
      <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
        <Toolbar className="p-0">
          {layoutConfig.navbar.display && layoutConfig.navbar.position === 'left' && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className="w-64 h-64 p-0" />
              <div className={classes.separator} />
            </Hidden>
          )}
          <div className="flex flex-1">
            {/* <Hidden mdDown>
              <FuseShortcuts className="px-16" />
            </Hidden> */}
          </div>

          <div className="flex">
            <UserMenu />
            <div className={classes.separator} />
            <FuseSearch />

            <div className={classes.separator} />

            <QuickPanelToggleButton />
          </div>
          {layoutConfig.navbar.display && layoutConfig.navbar.position === 'right' && (
            <Hidden lgUp>
              <NavbarMobileToggleButton />
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
    </MuiThemeProvider>
  );
};

function mapStateToProps({ fuse }) {
  return {
    settings: fuse.settings.current,
    toolbarTheme: fuse.settings.toolbarTheme
  };
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps)(ToolbarLayout1)));
