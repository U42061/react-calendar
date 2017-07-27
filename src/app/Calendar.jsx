import React from 'react';
import moment from 'moment';
import NBMomentCalendar from 'nb-moment-calendar';
import CurrentDay from './components/CurrentDay';
import DateSlider from './components/DateSlider';
import DatesGrid from './components/DatesGrid';
import EventTab from './components/EventTab';
import './scss/calendar.scss';


const formats =  {
    weekDay: 'dddd',
    date: 'DD',
    month: 'MMM',
    eventDate: 'DMMYY'
};

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            month: moment().get('month'),
            weekDay: moment().format(formats.weekDay),
            day: moment().format(formats.date),
            fDay: moment().format(formats.eventDate),
            dateTemplate: 'month',
            eventTab: {
                isOpened: false,
                date: moment().format(formats.eventDate)
            },
            events: {
                250717: [
                    {
                        title: 'Go for a walk',
                        description: 'Let\'s go for a walk, guys'
                    }
                ],
                210717: [
                    {
                        title: 'Bitterling cod queen',
                        description: 'Bitterling cod queen parrotfish flagfish three-toothed puffer gulper eel'
                    },
                    {
                        title: 'Parrotfish flagfish three-toothed',
                        description: 'Flagfish three-toothed puffer gulper eel. Flagfish three-toothed puffer gulper eelFlagfish three-toothed puffer gulper eel'
                    },
                    {
                        title: 'Flagfish three-toothed puffer gulper',
                        description: 'Flagfish three-toothed puffer gulper eel.'
                    }
                ]
                ,
                60717: [
                    {
                        title: 'Port Jackson shark',
                        description: 'Port Jackson shark anchovy fathead sculpin gudgeon'
                    }
                ]
            }
        };

        this.year = this.constructor.getData();
    }

    /**
     * Generate year dates data for app
     * @returns {number|array}
     */
    static getData() {
        const nbMomentCalObj = new NBMomentCalendar;
        return nbMomentCalObj.getYear(2017, 'MMM YYYY');
    }

    /**
     * switch current month value and close opened event tab
     * @param increase
     */
    changeMonthValue(increase) {
        const { month } = this.state;

        if (month === 11 && !!increase) {
            this.setState({month: 0})
        } else if (month === 0 && !increase) {
            this.setState({month: 11})
        } else {
            !!increase ? this.setState({month: (month + 1)}) : this.setState({month: (month - 1)});
        }

        this.setState({
            eventTab: {
                isOpened: false
            }
        });

    }

    /**
     * Change grid displaying view
     * @param template
     */
    switchTemplate(template = 'month') {
        this.setState({
            dateTemplate: template,
            eventTab: {
                isOpened: false,
            }
        });
    }

    /**
     * Change active date of calendar and update event tab content and state
     * @param date
     */
    activateDate(date) {
        let momentDate = moment(date.fday);

        this.setState({
            month: momentDate.get('month'),
            weekDay: momentDate.format(formats.weekDay),
            day: momentDate.format('D'),
            fDay: momentDate.format(formats.eventDate)
        });

        this.eventsHandler(momentDate);
    }

    /**
     * Change event tab content and state
     * @param date
     */
    eventsHandler(date) {
        this.setState({
            eventTab: {
                isOpened: true,
                date: date.format(formats.eventDate)
            }
        })
    }

    /**
     * Generate new event to certain date
     */
    addNewEvent() {
        const { events , fDay } = this.state;

        //TODO: implement route logic
        events[fDay].push({
            title: 'New event title',
            description: 'New event description'
        });

        this.setState({events})
    }

    render() {
        const { month, day, weekDay , dateTemplate, events, eventTab} = this.state;
        const date = {month, day, weekDay, year: this.year };

        return (
                <div className="calendar">
                    <CurrentDay
                        {...date}
                        switchTemplate={this.switchTemplate.bind(this)}
                        activateDate={this.activateDate.bind(this)}
                    />

                    <DateSlider
                        year={this.year} month={month}
                        changeMonthValue={this.changeMonthValue.bind(this)}
                    />

                    <DatesGrid
                        date={date}
                        dateTemplate={dateTemplate}
                        activateDate={this.activateDate.bind(this)}
                        eventsHandler={this.eventsHandler.bind(this)}
                        events={events}
                    />

                    <EventTab
                        opened={eventTab.isOpened}
                        date={+eventTab.date}
                        events={events}
                        addNewEvent={this.addNewEvent.bind(this)}
                    />
                </div>
        );
    }
}