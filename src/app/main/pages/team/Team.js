import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import PageviewIcon from '@material-ui/icons/Pageview';
import {
  withStyles,
  Button,
  Card,
  CardContent,
  Icon,
  Typography,
  CardActions,
  Divider,
  Avatar
} from '@material-ui/core';


//-------css style-------------------
const styles = theme => ({
  header: {
    background:
      'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
    color: theme.palette.getContrastText(theme.palette.primary.main)
  },
  widthStyle: {
    width: '50%',
    padding: '30px',
    display: 'inline-block'
  },
  txtAlign: {
    'text-align': 'center'
  },
  headerIcon: {
    position: 'absolute',
    top: -64,
    left: 0,
    opacity: 0.04,
    fontSize: 512,
    width: 512,
    height: 512,
    pointerEvents: 'none'
  },
  parentWrapper: {
    width: '70%'
  },
  cardStyle: {
    background: '#2D323E'
  }
});

class Team extends Component {


  render() {
    return (
      <div className={this.props.classes.parentWrapper}>
        <div className={this.props.classes.widthStyle}>
          <Card elevation={1} className="flex flex-col h-256">
            <div
              className="flex flex-no-shrink items-center justify-between px-24 h-64"
              style={{
                background: '#2D323E'
              }}
            >
              <Typography variant="h6" color="inherit" style={{ margin: 'auto', color: 'white' }}>
                Create Team
              </Typography>
            </div>
            <CardContent className="flex flex-col flex-auto items-center justify-center txtAlign">
              <Avatar>
                <Icon className="text-56">add_circle</Icon>
              </Avatar>
            </CardContent>
            <Divider />
            <CardActions className="justify-center">
              <Button to={`/team/create`} component={Link} className="justify-start px-32" color="secondary" onClick={this.handleShow}>
                Create
              </Button>

            </CardActions>
          </Card>
        </div>
        <div className={this.props.classes.widthStyle}>
          <Card elevation={1} className="flex flex-col h-256">
            <div
              className="flex flex-no-shrink items-center justify-between px-24 h-64"
              style={{
                background: '#2D323E'
              }}
            >
              <Typography variant="h6" color="inherit" style={{ margin: 'auto', color: 'white' }}>
                Join Team
              </Typography>
            </div>
            <CardContent className="flex flex-col flex-auto items-center justify-center txtAlign">
              <Avatar>
                <PageviewIcon />
              </Avatar>
            </CardContent>
            <Divider />
            <CardActions className="justify-center">
              <Button to={`/team/list`} component={Link} className="justify-start px-32" color="secondary">
                Join
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Team);
