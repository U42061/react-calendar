import React from 'react';
import moment from 'moment';
import DateItem from '../DateItem.jsx';
import PropTypes from 'prop-types';

export default class MonthTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: this.props.month
        };
    }

    componentWillReceiveProps(props) {
        this.setState({month: props.month});
    }

    render() {
        const {year, day : date, activateDate, events, eventsHandler} = this.props;
        const {month} = this.state;

        return <tbody>
        {
            year[this.state.month].data.map((el, i) =>   {
                return <tr key={i}>
                    {
                        Object.entries(el).map(([day, value], j) => {
                            return <DateItem
                                key={j.toString()}
                                item={value}
                                current={moment().format(moment(value.fday)._f) === value.fday}
                                active={date === value.day && moment(value.fday).get('M') === month}
                                disabled={moment(value.fday).get('M') !== month}
                                activateDate={activateDate}
                                events={events}
                                eventsHandler={eventsHandler}
                            />;
                        })
                    }
                </tr>;
            })
        }
        </tbody>
    }
}

MonthTemplate.propTypes = {
    year: PropTypes.array.isRequired,
    day: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    activateDate: PropTypes.func.isRequired,
    eventsHandler: PropTypes.func.isRequired,
    events: PropTypes.object.isRequired
};
