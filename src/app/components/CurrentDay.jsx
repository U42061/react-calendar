import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class CurrentDay extends React.Component {
    render() {
        const {month, day, switchTemplate, year, activateDate} = this.props;

        let weekDay = moment(`${day}.${month + 1}.2017`, 'DD.MM.YYYY').format('dddd');
        let mainDate = year[month].heading;

        return (
            <div className="current-date">
                <div className="current-day">
                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {weekDay}
                            <span className="caret"/>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li><a href="#" onClick={() => switchTemplate('month')}>Month</a></li>
                            <li><a href="#" onClick={() => switchTemplate('week')}>Week</a></li>
                            <li><a href="#" onClick={() => switchTemplate('day')}>Day</a></li>
                        </ul>
                    </div>
                </div>
                <div className="main-date">
                        <span className="today" onClick={() => activateDate(moment())}>
                        <i className="material-icons">today</i>
                    </span>
                    {mainDate}
                    <span className="day">{day}th</span>
                </div>
            </div>
        )
    }
}

CurrentDay.propTypes = {
    year: PropTypes.array.isRequired,
    day: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    switchTemplate: PropTypes.func.isRequired,
    activateDate: PropTypes.func.isRequired
};