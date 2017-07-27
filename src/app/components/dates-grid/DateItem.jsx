import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class DateItem extends React.Component {
    render() {
        const {current, disabled, active, activateDate, item, events} = this.props;
        const classes = classNames('dateitem', {current}, {disabled}, {active});

        return (
            <td className={classes} onClick={() => activateDate(item)} >
                <span>{moment(item).format('DD')}</span>
                {events[moment(item.fday).format('DMMYY')] ? <span className="event" /> : null}
            </td>
        );
    }
}

DateItem.propTypes = {
    item: PropTypes.object.isRequired,
    current: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    activateDate: PropTypes.func.isRequired
};

module.exports = DateItem;