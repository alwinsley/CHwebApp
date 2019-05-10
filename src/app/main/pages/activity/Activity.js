import React, { Component } from 'react';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { withStyles, Typography } from '@material-ui/core';

import TimelineTab from './tabs/TimelineTab';
import * as jwt_decode from "jwt-decode";
import history from 'history.js';


//----------get user data----------
var token = localStorage.getItem('token');
var decoded = [];

//----------Api config ---------
const api_host = "http://localhost:8080";

let headers = new Headers();

headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Content-Type', 'application/json');
headers.append('authorization', 'Bearer ' + token);

var team = {
  'id': 0,
  'name': '',
  'position': '',
  'isJoined': false,
};


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
    team_name: '',
    team_id: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  readTeamInfo() {
    fetch(api_host + '/user/getById/' + decoded.user.id, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        response.json().then(data => {
          console.log(data);
          if (data.length > 0) {
            this.setState({
              team_name: data[0].name,
              team_id: data[0].team_id,
            });
          }
        });
      });
  }

  componentDidMount() {
    if (token != null && token != "") {
      decoded = jwt_decode(token);
    } else {
      history.push('/login');
    }
  }

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
                  {/* My Recent Activities */}
                  {this.state.team_name}
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        content={
          <div className="p-16 sm:p-24 flex flex-col items-center justify-center w-full">
            <TimelineTab team_id={this.state.team_id} />
          </div>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ActivityPage);
