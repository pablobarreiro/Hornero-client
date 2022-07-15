import React from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'


export default class Calendario extends React.Component {

  render() {

    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: '',
          right: 'title'
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5]
        }}
        initialView="dayGridMonth"
        dateClick={this.handleDateClick}
          contentHeight = {250}
            />
    )


}


handleDateClick = (info) => {
  this.props.setDate(info.dateStr.split("-").reverse().join("-"));
  this.props.setShow('') 
}

}