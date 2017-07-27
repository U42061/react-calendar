import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ps from 'perfect-scrollbar';

let PsOptions =  {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
};

export default class EventTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opened: this.props.opened
        };
    }

    /**
     * trigger open/hide state of a event tab
     */
    triggerTab() {
        this.setState({opened: false});
    }

    /**
     * Init perfect-scrollbar after el rendered
     */
    componentDidMount() {
        Ps.initialize(this.scrollContainer, PsOptions);
    }

    /**
     * Update perfect-scrollbar after el height change or re-render
     */
    componentDidUpdate() {
        Ps.update(this.scrollContainer, PsOptions);
    }

    componentWillReceiveProps({opened}) {
        this.setState({opened});
    }

    /**
     * Get html of each item depend on data in Calendar.events array
     * @param events
     * @param date
     * @returns {XML}
     */
    getEventItem(events, date) {
        if (events[date]) {
            return events[date].map((el, i) => {
                return <span className="event" key={i}>
                    <h3 className="title">{el.title}</h3>
                    <p className="description">{el.description}</p>
                </span>
            })
        }
        return <p className="no-events">No events added</p>
    }

    render() {
        const {date, events, addNewEvent} = this.props;
        const {opened} = this.state;
        const classes = classNames(
            'events-grid',
            // Open event tab only if >= items in Calendar.events array for particular date
            {opened: opened && events[date] ? Object.keys(events[date]).length >= 2 : false});

        return (
            <div className={classes} onClick={this.triggerTab.bind(this)}>
                <h2 className="title">Events</h2>
                <div className="events" ref={(el) => {return this.scrollContainer = el}}>
                    {this.getEventItem(events, date)}
                </div>
                <button type="button"
                        className="add-event" title="Add Event"
                        onClick={addNewEvent}
                >+</button>
            </div>
        )
    }
}

EventTab.propTypes = {
    opened: PropTypes.bool,
    date: PropTypes.number,
    events: PropTypes.object,
    addNewEvent: PropTypes.func.isRequired
};