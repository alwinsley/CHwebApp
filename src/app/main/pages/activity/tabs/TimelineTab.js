import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions';

import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Icon,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';
import { FuseAnimateGroup } from '@fuse';
import { Link } from 'react-router-dom';
import * as jwt_decode from "jwt-decode";
import _ from '@lodash';
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


var posts = [];
var comments = [];
var team_id = "";
const initialState = {
  activities: null,
  posts: [],
  content: '',
};

class TimelineTab extends Component {
  state = initialState;

  //----------read data----------
  readPostData(team_id) {
    this.setState({
      activities: null,
      posts: [],
      content: '',
    });
    console.log(this.state);

    posts = [];
    comments = [];

    fetch(api_host + '/team/getPostById/' + team_id, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        response.json().then(data => {
          console.log(data);
          if (data.data.length != 0) {

            data.data.forEach(post => {
              if (data.comment.length != 0) {

                data.comment.forEach(comment => {
                  // console.log(comment.pid, post.id);
                  if (comment.pid == post.id) {
                    comments.push(
                      {
                        id: comment.id,
                        user: {
                          name: comment.username,
                          avatar: comment.pic,
                        },
                        time: comment.created_date,
                        message: comment.content,
                      }
                    );
                  }
                });
              }

              posts.push({
                id: post.id,
                user: {
                  name: post.username,
                  avatar: post.pic,
                },
                message: post.content,
                time: post.created_date,
                type: 'post',
                // like: 5,
                // share: 21,
                // media: {
                //   type: 'image',
                //   preview: 'assets/images/profile/morain-lake.jpg'
                // },
                comments: comments
              });

              comments = [];
            });
            this.setState({ posts: posts });
            console.log(this.state);
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
    // this.readPostData();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("nextProps:", nextProps)
    team_id = nextProps.team_id;
    this.readPostData(team_id);
  }

  //-----------------post part------------
  async createPost(event) {
    console.log(this.state.content);
    await fetch(api_host + '/post', {
      method: 'POST',
      body: JSON.stringify({
        title: '',
        content: this.state.content,
        created_by: decoded.user.id,
      }),
      headers: headers
    })
      .then(response => {
        response.json().then(data => {
          this.props.showMessage({
            message: "Posted Successful",
            autoHideDuration: 6000,//ms
            anchorOrigin: {
              vertical: 'top',//top bottom
              horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
          });
          this.readPostData(team_id);
        });
      });
  }

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.value
      )
    );
  };

  //--------------------comment part--------------
  handleChangeComment = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  };

  async createComment(event, pid, type) {
    var key = 'key' + pid;
    const state = this.state;
    console.log(state[key]);

    await fetch(api_host + '/comment', {
      method: 'POST',
      body: JSON.stringify({
        pid: pid,
        type: type,
        content: state[key],
        created_by: decoded.user.id,
      }),
      headers: headers
    })
      .then(response => {
        response.json().then(data => {
          this.props.showMessage({
            message: "Posted Successful",
            autoHideDuration: 6000,//ms
            anchorOrigin: {
              vertical: 'top',//top bottom
              horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
          });
          this.readPostData(team_id);
        });
      });

  }


  render() {
    const { posts, content } = this.state;
    console.log(this.state);

    // console.log('///////////////',this.props);

    return (
      <div className="flex p-24 w-full max-w-2xl mx-auto">
        <div className="flex flex-col flex-1 md:pr-32">
          <FuseAnimateGroup
            enter={{
              animation: 'transition.slideUpBigIn'
            }}
          >
            <div>
              <Card className="w-full overflow-hidden">
                <Input
                  className="p-16 w-full"
                  classes={{ root: 'text-14' }}
                  placeholder="Write something.."
                  multiline
                  rows="6"
                  margin="none"
                  disableUnderline
                  onChange={this.handleChange}
                  value={content}
                  name="content"
                />
                <AppBar
                  className="card-footer flex flex-row border-t-1"
                  position="static"
                  color="default"
                  elevation={0}
                >
                  <div className="p-8">
                    <Button variant="contained" color="primary" size="small" aria-label="post" onClick={(e) => this.createPost(e)}>
                      POST
                    </Button>
                  </div>
                </AppBar>
              </Card>

              <Divider className="my-32" />
            </div>

            {posts &&
              posts.map(post => (
                <Card className="mb-32 overflow-hidden" key={post.id}>
                  <CardHeader
                    avatar={<Avatar aria-label="Recipe" src={post.user.avatar} />}
                    action={
                      <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                      </IconButton>
                    }
                    title={
                      <span>
                        <Typography className="inline font-medium mr-4" color="primary" paragraph={false}>
                          {post.user.name}
                        </Typography>
                        {post.type === 'post' && 'posted on your timeline'}
                        {post.type === 'something' && 'shared something with you'}
                        {post.type === 'video' && 'shared a video with you'}
                        {post.type === 'article' && 'shared an article with you'}
                      </span>
                    }
                    subheader={post.time}
                  />

                  <CardContent className="py-0">
                    {post.message && (
                      <Typography component="p" className="mb-16">
                        {post.message}
                      </Typography>
                    )}

                    {/* {post.media && <img src={post.media.preview} alt="post" />} */}
                  </CardContent>

                  {/* <CardActions className="" disableActionSpacing>
                    <Button size="small" aria-label="Add to favorites">
                      <Icon className="text-16 mr-8" color="action">
                        favorite
                      </Icon>
                      <Typography className="normal-case">Like</Typography>
                      <Typography className="normal-case ml-4">({post.like})</Typography>
                    </Button>
                    <Button aria-label="Share">
                      <Icon className="text-16 mr-8" color="action">
                        share
                      </Icon>
                      <Typography className="normal-case">Share</Typography>
                      <Typography className="normal-case ml-4">({post.share})</Typography>
                    </Button>
                  </CardActions> */}

                  <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
                    {post.comments && post.comments.length > 0 && (
                      <div className="">
                        <div className="flex items-center">
                          <Typography>{post.comments.length} comments</Typography>
                          <Icon className="text-16 ml-4" color="action">
                            keyboard_arrow_down
                          </Icon>
                        </div>

                        <List>
                          {post.comments.map(comment => (
                            <div key={comment.id}>
                              <ListItem className="px-0">
                                <Avatar alt={comment.user.name} src={comment.user.avatar} />
                                <ListItemText
                                  primary={
                                    <div>
                                      <Typography className="inline font-medium" color="default" paragraph={false}>
                                        {comment.user.name}
                                      </Typography>
                                      <Typography className="inline ml-4" variant="caption">
                                        {comment.time}
                                      </Typography>
                                    </div>
                                  }
                                  secondary={comment.message}
                                />
                              </ListItem>
                              {/* <div className="flex items-center ml-56 mb-8">
                                <Link to="#" className="mr-8">
                                  Reply
                                </Link>
                                <Icon className="text-14 cursor-pointer">flag</Icon>
                              </div> */}
                            </div>
                          ))}
                        </List>
                      </div>
                    )}

                    <div className="flex flex-auto">
                      <Avatar src="assets/images/avatars/profile.jpg" />
                      <div className="flex-1 pl-8">
                        <Paper elevation={0} className="w-full mb-16">
                          <Input
                            className="p-8 w-full border-1"
                            classes={{ root: 'text-13' }}
                            placeholder="Add a comment.."
                            multiline
                            rows="6"
                            margin="none"
                            disableUnderline
                            onChange={this.handleChangeComment}
                            name={'key' + post.id}
                          />
                        </Paper>
                        <Button className="normal-case" variant="contained" color="primary" size="small" onClick={(e) => this.createComment(e, post.id, post.type)}>
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </AppBar>
                </Card>
              ))}
          </FuseAnimateGroup>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage,
    },
    dispatch
  );
}

function mapStateToProps({ eCommerceApp }) {
  return {
    // products: eCommerceApp.products.data,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TimelineTab)
);
