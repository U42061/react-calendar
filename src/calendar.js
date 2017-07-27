import React from 'react';
import ReactDOM from 'react-dom';
import CalendarApp from './app/Calendar';
import {Provider } from 'react-redux';
import { createStore } from 'redux';
import 'material-design-icons'

function calendar(state = [], action) {
    return state;
}

const store = createStore(calendar);


ReactDOM.render(
    <Provider store={store}>
        <CalendarApp />
    </Provider>,
    document.getElementById('mount-point')
);