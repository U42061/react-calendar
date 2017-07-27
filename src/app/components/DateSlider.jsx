import React from 'react';
import PropTypes from 'prop-types';

export default class DateSlider extends React.Component {
    render () {
        const {changeMonthValue, year, month} = this.props;

        let mainDate = year[month].heading;

        return <div className="month-slider">
            <button className="arrow left" type="button" onClick={()=>changeMonthValue(-1)}>
                <i className="material-icons md-18">keyboard_arrow_left</i>
            </button>
            <button className="arrow right" type="button" onClick={()=>changeMonthValue(1)} >
                <i className="material-icons">keyboard_arrow_right</i>
            </button>
            { mainDate }
        </div>
    }
}

DateSlider.propTypes = {
    year: PropTypes.array.isRequired,
    month: PropTypes.number.isRequired,
    changeMonthValue: PropTypes.func.isRequired
};