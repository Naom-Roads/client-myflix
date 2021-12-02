export const SET_MOVIES = 'SET_MOVIES';
export const SET_USER = 'SET_USER';
export const ADD_MOVIE = 'ADD_MOVIE';
export const UPDATE_USER = 'UPDATE_USER'
export const SET_FILTER = 'SET_FILTER';


export function setMovies(value) {
    return {
        type: SET_MOVIES,
        value
    } ;
}

export function addMovie(value) {
    return {
        type: ADD_MOVIE,
        value
    };
}


export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setUser(value) {
    return {
        type: SET_USER,
        value
    };
}

export function updateUser(value) {
    return {
        type: UPDATE_USER,
        value
    };
}