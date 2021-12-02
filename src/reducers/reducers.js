import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, ADD_MOVIE, UPDATE_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function movie(state = [], action) {
    switch (action.type) {
        case ADD_MOVIE:
            return action.value;
        default:
            return state;
    }
}


function updateUser(state = [], action) {
    switch (action.type) {
        case UPDATE_USER:
            return action.value;
        default:
            return state;

    }
}



function moviesApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action),
        users: users(state.users, action)
    }
}

export default moviesApp;