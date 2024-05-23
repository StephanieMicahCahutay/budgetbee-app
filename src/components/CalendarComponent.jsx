import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import '../styles/CalendarStyles.css';

const CalendarComponent = ({ onChange, value }) => {
    return (
        <div className="calendar-container">
            <Calendar
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default CalendarComponent;