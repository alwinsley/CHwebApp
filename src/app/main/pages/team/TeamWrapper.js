import React, { Component } from 'react';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { withStyles, Typography } from '@material-ui/core';

import Team from './Team';

import * as jwt_decode from "jwt-decode";
import history from 'history.js';


//----------get user data----------
var user_token = localStorage.getItem('token');
var decoded = [];


const styles = theme => ({
  layoutHeader: {
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('md')]: {
      height: 240,
      minHeight: 240
    }
  }
});

class ActivityPage extends Component {
  state = {
    value: 0
  };

  componentDidMount() {
    if (user_token != null && user_token != "") {
      decoded = jwt_decode(user_token);
    } else {
      history.push('/login');
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <FusePageSimple
        classes={{
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          toolbar: 'px-16 sm:px-24'
        }}
        header={
          <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  Team
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 flex flex-col items-center justify-center w-full">
            <Team />
          </div>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ActivityPage);
