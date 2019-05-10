import React from 'react';
import { FuseAnimate } from '@fuse';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../store/actions';
import { Paper, Input, Icon, Typography, MuiThemeProvider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const ProductsHeader = ({ setSearchText, searchText, mainTheme }) => {
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h6">
            LIST OF SONGS
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
      <Button to={`/songs/create`} component={Link} variant="contained" color="secondary" aria-label="Follow">
        Add Song
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

function mapStateToProps({ eCommerceApp, fuse }) {
  return {
    searchText: eCommerceApp.products.searchText,
    mainTheme: fuse.settings.mainTheme
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsHeader);
