import React, { Component } from 'react';
import {
    TextField, Button, Dialog, DialogActions, DialogContent,
    Icon, IconButton, Typography, Toolbar, AppBar, FormControlLabel, Switch,
    Select, FormControl, Input, Chip, MenuItem
} from '@material-ui/core';
import FuseUtils from '@fuse/FuseUtils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from '@lodash';
import moment from 'moment';
import * as Actions from './store/actions';
import { wrap } from 'module';

import { FuseChipSelect } from '@fuse';


import * as jwt_decode from "jwt-decode";
import history from 'history.js';

let song = [];
let limit = 10;


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

const defaultEventState = {
    id: FuseUtils.generateGUID(),
    title: '',
    allDay: true,
    start: new Date(),
    end: new Date(),
    desc: '',
    song_name: [],
    song_id: [],
    songs: [],
    tags: [],
};


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, that) {
    return {
        fontWeight:
            that.state.song_name.indexOf(name) === -1
                ? 400
                : 600,
    };
}

class EventDialog extends Component {

    state = { ...defaultEventState };


    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * After Dialog Open
         */
        if (!prevProps.eventDialog.props.open && this.props.eventDialog.props.open) {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if (this.props.eventDialog.type === 'edit' &&
                this.props.eventDialog.data &&
                !_.isEqual(this.props.eventDialog.data, prevState)) {
                this.setState({ ...this.props.eventDialog.data });
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if (this.props.eventDialog.type === 'new') {
                this.setState({ ...defaultEventState, ...this.props.eventDialog.data });
            }

            if (token != null && token != "") {
                decoded = jwt_decode(token);

                fetch(api_host + '/user/getById/' + decoded.user.id, {
                    method: 'GET',
                    headers: headers,
                })
                    .then(response => {
                        response.json().then(data => {
                            console.log(data);
                            if (data.length != 0) {
                                limit = "unlimit";
                            } else {
                                limit = 10;
                            }

                            fetch(api_host + '/song/' + limit, {
                                method: 'GET',
                                headers: headers,
                            })
                                .then(response => {
                                    response.json().then(data => {
                                        console.log(data);
                                        this.setState({ songs: data });
                                        // console.log("state:", this.state.songs)
                                    });
                                });
                        });
                    });
            } else {
                history.push('/login');
            }
        }
    }

    handleChange = (event) => {
        // console.log(event.target);
        this.setState(_.set({ ...this.state }, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value, { song_id: event.target.value }));

    };

    handleSongChange = (event) => {
        this.setState({ song_id: event.target.value });
    };

    handleChipChange = (value) => {
        var song_id = [];
        console.log(value);
        this.setState({ tags: value });
        value.forEach(tag => {
            song_id.push(tag.value);
        });
        this.setState({ song_id: song_id });
    };

    closeComposeDialog = () => {
        this.props.eventDialog.type === 'edit' ? this.props.closeEditEventDialog() : this.props.closeNewEventDialog();
    };

    canBeSubmitted() {
        const { title } = this.state;
        return (
            title.length > 0
        );
    }

    render() {
        const { eventDialog, addEvent, updateEvent, removeEvent, classes } = this.props;
        const start = moment(this.state.start).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
        const end = moment(this.state.end).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);

        const suggestions = this.state.songs.map(item => ({
            value: item.id,
            label: item.name
        }));


        console.log(this.state);
        return (
            <Dialog {...eventDialog.props} onClose={this.closeComposeDialog} fullWidth maxWidth="xs">

                <AppBar position="static">
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>

                    <TextField
                        id="title"
                        label="Title"
                        className="mt-8 mb-16"
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            max: end
                        }}
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        variant="outlined"
                        autoFocus
                        required
                        fullWidth
                    />

                    <FormControlLabel
                        className="mt-8 mb-16"
                        label="All Day"
                        control={
                            <Switch
                                checked={this.state.allDay}
                                id="allDay" name="allDay" onChange={this.handleChange}
                            />
                        } />

                    <TextField
                        id="start"
                        name="start"
                        label="Start"
                        type="datetime-local"
                        className="mt-8 mb-16"
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            max: end
                        }}
                        value={start}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        id="end"
                        name="end"
                        label="End"
                        type="datetime-local"
                        className="mt-8 mb-16"
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            min: start
                        }}
                        value={end}
                        onChange={this.handleChange}
                        variant="outlined"
                        fullWidth
                    />

                    <TextField
                        className="mt-8 mb-16"
                        id="desc" label="Description"
                        type="text"
                        name="desc"
                        value={this.state.desc}
                        onChange={this.handleChange}
                        multiline rows={5}
                        variant="outlined"
                        fullWidth
                    />

                    <FuseChipSelect
                        className="w-full my-16"
                        value={this.state.tags}
                        onChange={this.handleChipChange}
                        placeholder="Select multiple tags"
                        textFieldProps={{
                            label: 'Tags',
                            InputLabelProps: {
                                shrink: true
                            },
                            variant: 'standard'
                        }}
                        options={suggestions}
                        isMulti
                    />
                </DialogContent>

                {eventDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addEvent(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between pl-8 sm:pl-16">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    updateEvent(this.state);
                                    this.closeComposeDialog();
                                }}
                                disabled={!this.canBeSubmitted()}
                            > Save
                        </Button>
                            <IconButton
                                onClick={() => {
                                    removeEvent(this.state.id);
                                    this.closeComposeDialog();
                                }}
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeEditEventDialog: Actions.closeEditEventDialog,
        closeNewEventDialog: Actions.closeNewEventDialog,
        addEvent: Actions.addEvent,
        updateEvent: Actions.updateEvent,
        removeEvent: Actions.removeEvent
    }, dispatch);
}

function mapStateToProps({ calendarApp }) {
    return {
        eventDialog: calendarApp.events.eventDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventDialog);
