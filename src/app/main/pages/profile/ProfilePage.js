import React, { Component } from 'react';
import { FusePageSimple, FuseAnimate } from '@fuse';
import { withStyles, Avatar, Typography } from '@material-ui/core';

import * as jwt_decode from "jwt-decode";
import history from 'history.js';


//----------get user data----------
var token = localStorage.getItem('token');
var decoded = [];

//----------Api config ---------
const api_host = "http://localhost:8080";

let headers = new Headers();

headers.append('Access-Control-Allow-Origin', api_host);
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('Content-Type', 'application/json');
headers.append('authorization', 'Bearer ' + token);

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

class ProfilePage extends Component {
  state = {
    team: { 
      'name': '',
      'position': '',
    },
    user: { 'role': 'guest',
      'data': {
        username: '',
        photoURL: '',
      }
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount(){
    var photoURL = "";
    var username = "";

    var team = { 
      'name': '',
      'position': '',
    } 

    if(token != null && token != ""){
      decoded = jwt_decode(token);

      username = decoded.user.username;
    
      if(decoded.user.pic != null){
          photoURL = decoded.user.pic;
      }
      var user = { 'role': 'guest',
        'data': {
          'username': username,
          'photoURL': photoURL
        }
      }
  
      this.setState({ user: user });
  
      fetch(api_host + '/user/' + decoded.user.id + '/getTeam', {
        method: 'GET',
        headers: headers
      })
      .then(response => {
        response.json().then(data => {
          console.log(data);
  
          if(data.teamInfo.length != 0){
            team = { 
              'name': data.teamInfo[0].name,
              'position': data.teamInfo[0].position
            } 
            this.setState({ user: user, team: team }); 
          }
  
        })
      });
    }else{
      history.push('/login');
    }
  }

  render() {

    const { user, team } = this.state;
    console.log(this.state);

    return (
      <FusePageSimple
        classes={{
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          toolbar: 'px-16 sm:px-24'
        }}
        header={
          <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <Avatar className="w-96 h-96" 
                // src="assets/images/avatars/Velazquez.jpg" 
                src={user.data.photoURL} 
                />
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h4" color="inherit">
                  {user.data.username}
                </Typography>
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h6" color="inherit">
                  Team Name: {team.name}
                </Typography>
              </FuseAnimate>
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="md:ml-24" variant="h6" color="inherit">
                  Postion : {team.position}
                </Typography>
              </FuseAnimate>
            </div>
          </div>
        }
        content={<div className="p-16 sm:p-24" />}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProfilePage);
