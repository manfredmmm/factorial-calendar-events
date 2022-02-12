import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'

type Event = {
  id: number;
  title: string;
  description: string;
  start_ts: any,
  end_ts: any
}

type CalenderEvent = {
  id: number,
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource?: any,
}

const BigCalendar = () => {
  const [list, setList] = useState([]);

  const parseEvents = (events: Event[]) => {
    return events.map((event: Event) => {
      return {
        id: event.id,
        title: event.title,
        start: moment.unix(event.start_ts).toDate(),
        end: moment.unix(event.end_ts).toDate()
      }
    });
  }

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  const createEvent = (event: CalenderEvent) => {
    console.log(event);
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/events')
      .then(response => response.json())
      .then(setList);
  }, []);

  return(
    <div className="w-4/5">
      <Calendar
        localizer={momentLocalizer(moment)}
        events={parseEvents(list)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        // onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
      />
      <div>
        {list.map((event: Event) => 
          <div key={event.id}>{event.title} / {event.start_ts} / {event.end_ts}</div>
          )}
      </div>
    </div>
  );
}

export default BigCalendar;