import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class DatesGrid extends React.Component {
    render() {
        const weekArray = moment.weekdaysMin();
        const {date, activateDate, eventsHandler, events, dateTemplate} = this.props;
        // Load template dynamically depend on switcher
        const DatesTemplate = require(`./dates-grid/templates/${ dateTemplate }`);

        return (
            <div className="dates-grid">
                <table className="weak-days">
                    <thead>
                    <tr>
                        {
                            weekArray.map((el, i) => {
                                return <td className="item" key={i}>{el}</td>
                            })
                        }
                    </tr>
                    </thead>
                    < DatesTemplate {...date}
                                    activateDate={activateDate}
                                    eventsHandler={eventsHandler}
                                    events={events}/>
                </table>
            </div>
        )
    }
}

DatesGrid.propTypes = {
    dateTemplate: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    activateDate: PropTypes.func.isRequired,
    eventsHandler: PropTypes.func.isRequired,
    events: PropTypes.object.isRequired,
};