import _ from '@lodash';
import { FuseScrollbars } from '@fuse';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import TeamTableHead from './TeamTableHead';
import * as Actions from '../store/actions';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { Table, TableBody, TableCell, TablePagination, TableRow, Button } from '@material-ui/core';
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


class ProductsTable extends Component {
  state = {
    order: 'asc',
    orderBy: null,
    selected: [],
    data: this.props.products,
    page: 0,
    rowsPerPage: 10,
  };

  readTeamInfo(){
    fetch(api_host + '/team', {
      method: 'GET',
      headers: headers
    })
    .then(response => {
      response.json().then(data => {
        console.log(data);

        if(data.teamInfo.length != 0){
          console.log('team data')
          team = data.teamInfo;
          this.setState({ data: team });
        }
      })
    });
  }

  componentDidMount() {
    if(token != null && token != ""){
      decoded = jwt_decode(token);
      this.readTeamInfo();
    }else{
      history.push('/login');
    }        
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !_.isEqual(this.props.products, prevProps.products) ||
      !_.isEqual(this.props.searchText, prevProps.searchText)
    ) {
      const data = this.getFilteredArray(team, this.props.searchText);
      this.setState({ data });
    }
  }

  getFilteredArray = (data, searchText) => {
    if (searchText.length === 0) {
      return data;
    }
    console.log(data);
    return _.filter(data, item => item.name.toLowerCase().includes(searchText.toLowerCase()));
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({
      order,
      orderBy
    });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = item => {
    this.props.history.push('/apps/e-commerce/products/' + item.id + '/' + item.handle);
  };

  handleCheck = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    this.setState({ selected: newSelected });
  };

  async joinClick(event, id, name) {
    await fetch(api_host + '/user/'+decoded.user.id+'/joinTeam/'+id, {
      method: 'POST',
      body: JSON.stringify({
        position: 'Member',
      }),
      headers: headers
    })
    .then(response => {
      this.props.showMessage({
        message     : "You are joined in " + name,
        autoHideDuration: 6000,//ms
        anchorOrigin: {
            vertical  : 'top',//top bottom
            horizontal: 'right'//left center right
        },
        variant: 'success'//success error info warning null
      });
    });

    this.readTeamInfo();
 
  }  

  async exitClick(event, id, name){
    await fetch(api_host + '/user/'+decoded.user.id+'/exitTeam/'+id, {
      method: 'POST',
      body: JSON.stringify({
        position: 'Member',
      }),
      headers: headers
    })
    .then(response => {
      this.props.showMessage({
        message     : "You are exited from " + name,
        autoHideDuration: 6000,//ms
        anchorOrigin: {
            vertical  : 'top',//top bottom
            horizontal: 'right'//left center right
        },
        variant: 'success'//success error info warning null
      });
    });
    this.readTeamInfo();
  }


  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {  
    const { order, orderBy, selected, rowsPerPage, page, data } = this.state;

    console.log(this.state);
    // console.log('///////////////',this.props);

    var hasTeam = false;
    this.state.data.forEach(team => {
      if(team.uid == decoded.user.id)
        hasTeam = true;
    });

    return (
      <div className="w-full flex flex-col">
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <Table className="min-w-xl" aria-labelledby="tableTitle">
            <TeamTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            {hasTeam ? (
              <TableBody>
                {_.orderBy(
                  data,
                  [
                    o => {
                      switch (orderBy) {
                        case 'categories': {
                          return o.categories[0];
                        }
                        default: {
                          return o[orderBy];
                        }
                      }
                    }
                  ],
                  [order]
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        className="h-64 cursor-pointer"
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell component="th" scope="row">
                          {n.name}
                        </TableCell>

                        {/* <TableCell className="truncate" component="th" scope="row">
                          {n.location}
                        </TableCell> */}

                        <TableCell className="truncate" component="th" scope="row">
                          {n.uid == decoded.user.id ? (
                            <Button variant="contained" color="secondary" disabled={false} aria-label="Follow" onClick={(e)=>this.exitClick(e, n.id, n.name)}>
                              Exit
                            </Button>                        
                            ) : (
                            <Button variant="contained" color="secondary" disabled={true} aria-label="Follow" onClick={(e)=>this.joinClick(e, n.id, n.name)}>
                              Join
                            </Button>  
                            )
                          }

                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>                    
              ) : (
              <TableBody>
                {_.orderBy(
                  data,
                  [
                    o => {
                      switch (orderBy) {
                        case 'categories': {
                          return o.categories[0];
                        }
                        default: {
                          return o[orderBy];
                        }
                      }
                    }
                  ],
                  [order]
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        className="h-64 cursor-pointer"
                        hover
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell component="th" scope="row">
                          {n.name}
                        </TableCell>

                        {/* <TableCell className="truncate" component="th" scope="row">
                          {n.location}
                        </TableCell> */}

                        <TableCell className="truncate" component="th" scope="row">
                            <Button variant="contained" color="secondary" disabled={false} aria-label="Follow" onClick={(e)=>this.joinClick(e, n.id, n.name)}>
                              Join
                            </Button>  

                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )
            }
          </Table>
        </FuseScrollbars>

        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getProducts: Actions.getProducts,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage,
    },
    dispatch
  );
}

function mapStateToProps({ eCommerceApp }) {
  return {
    products: eCommerceApp.products.data,
    searchText: eCommerceApp.products.searchText
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductsTable)
);
