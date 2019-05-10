import React, { Component } from 'react';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import history from 'history.js';
import * as jwt_decode from "jwt-decode";

class UserMenu extends Component {
  state = {
    userMenu: null,
    user: { 'role': 'guest',
            'data': {
              displayName: '',
              photoURL: '',
            }
          }
  };

  componentDidMount() {
        
    var token = localStorage.getItem('token');
    console.log(token);

    var photoURL = "";
    var username = "";
    
    if(token != null && token != ''){
      var decoded = jwt_decode(token);
      console.log(decoded);    
      username = decoded.user.username;
      
      if(decoded.user.pic != null){
          photoURL = decoded.user.pic;
      }
      var user = { 'role': 'guest',
        'data': {
          'displayName': username,
          'photoURL': photoURL
        }
      } 
      this.setState({ user: user});
    }else{
      history.push({
          pathname: '/'
      });
    }
  }

  userMenuClick = event => {
    this.setState({ userMenu: event.currentTarget });
  };

  userMenuClose = () => {
    this.setState({ userMenu: null });
  };

  logout = () => {
    localStorage.removeItem('token');
    history.push({
      pathname: '/'
    });
  };

  render() {
    // const { user, logout } = this.props;
    const { user, userMenu } = this.state;

    return (
      <React.Fragment>
        <Button className="h-64" onClick={this.userMenuClick}>
          {user.data.photoURL ? (
            <Avatar className="" alt="user photo" src={user.data.photoURL} />
          ) : (
            <Avatar className="">{user.data.displayName}</Avatar>
          )}

          {/* <div className="hidden md:flex flex-col ml-12 items-start"> */}
          <div className="md:flex flex-col ml-12 items-start">
            <Typography component="span" className="normal-case font-600 flex">
              {user.data.displayName}
            </Typography>
            <Typography className="text-11 capitalize" color="textSecondary">
              {user.role}
            </Typography>
          </div>

          <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
            keyboard_arrow_down
          </Icon>
        </Button>

        <Popover
          open={Boolean(userMenu)}
          anchorEl={userMenu}
          onClose={this.userMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          classes={{
            paper: 'py-8'
          }}
        >
          {user.role === 'guest' ? (
            <React.Fragment>
              <MenuItem component={Link} to="/activity" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>whatshot</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Home" />
              </MenuItem>
              <MenuItem component={Link} to="/songs" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>alarm</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Songs" />
              </MenuItem>
              <MenuItem component={Link} to="/calendar" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>today</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Calendar" />
              </MenuItem>
              <MenuItem component={Link} to="/team_member/list" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>account_box</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Team members" />
              </MenuItem>
              <MenuItem component={Link} to="/team" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>account_box</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="List Of Teams" />
              </MenuItem>
              <MenuItem component={Link} to="/pricing" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>attach_money</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Pricing" />
              </MenuItem>
              <MenuItem component={Link} to="/profile" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>account_circle</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="My Profile" />
              </MenuItem>
              {/* <MenuItem component={Link} to="/apps/mail" onClick={this.userMenuClose}>
                <ListItemIcon>
                  <Icon>mail</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Inbox" />
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  this.logout();
                  this.userMenuClose();
                }}
              >
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Logout" />
              </MenuItem>
            </React.Fragment>          
          ) : (
            <React.Fragment>
            <MenuItem component={Link} to="/">
              <ListItemIcon>
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register">
              <ListItemIcon>
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Register" />
            </MenuItem>
          </React.Fragment>
            )}
        </Popover>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: authActions.logoutUser
    },
    dispatch
  );
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenu);
