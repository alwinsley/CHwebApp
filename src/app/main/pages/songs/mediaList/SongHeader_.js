import React from 'react';
import { FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { Paper, Input, Icon, Typography, MuiThemeProvider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import history from 'history.js';

import * as jwt_decode from "jwt-decode";


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


const ProductsHeader = ({ setSearchText, searchText, mainTheme, sid }) => {
  var selectedFile = null;

  function uploadMedia(){
    console.log(sid);
    // fetch(api_host + '/song', {
    //   method: 'POST',
    //   body: JSON.stringify({        
    //     name: selectedFile.name,
    //     path: 'uploads/media/'+selectedFile.name+'.'+selectedFile.type.split('/')[1],
    //     song_id: sid,
    //   }),
    //   headers: headers
    // })
    // .then(response => {
    //   response.json().then(data => {
    //     console.log(data); 
    //     history.push('list');
    //   })
    // });
  };

  function fileSelectHandler(event){
    selectedFile = event.target.files[0];
    console.log(selectedFile);
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h6">
            LIST OF SONG MEDIA {}
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <MuiThemeProvider theme={mainTheme}>
          <FuseAnimate animation="transition.slideDownIn" delay={300}>
            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
              <Icon className="mr-8" color="action">
                search
              </Icon>

              <Input
                placeholder="Search"
                className="flex flex-1"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Search'
                }}
                onChange={setSearchText}
              />
            </Paper>

          </FuseAnimate>
        </MuiThemeProvider>
      </div>
      
      <Input id="my-input" aria-describedby="my-helper-text" type="file" 
        onChange={fileSelectHandler} ref={fileInput => fileInput = fileInput}/>
      {/* <Button onClick={()=> fileInput.Click()} variant="contained" color="secondary" aria-label="Follow">
        Pick File
      </Button> */}
      <Button onClick={uploadMedia} variant="contained" color="secondary" aria-label="Follow">
        Upload New Media
      </Button>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setSearchText: Actions.setProductsSearchText
    },
    dispatch
  );
}

function mapStateToProps({ eCommerceApp, fuse, ownProps }) {
  console.log(ownProps);
  return {
    searchText: eCommerceApp.products.searchText,
    mainTheme: fuse.settings.mainTheme,
    // sid : ownProps.match.params.sid,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsHeader);
