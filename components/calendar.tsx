import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import EventModal from 'components/event_modal'

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
  start: any,
  end: any
}

const BigCalendar = () => {
  const [list, setList] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({id: 0, title: '', start: '', end: ''});
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/events')
      .then(response => response.json())
      .then(setList);
  }, []);

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
  
  const handleSelectedEvent = (event: CalenderEvent) => {
    console.log(event);
    event.start = moment(event.start).unix().toString();
    event.end = moment(event.end).unix().toString();
    setSelectedEvent(event);
    setModalState(true);
  }

  return(
    <div className="w-4/5 bg-white">
      <Calendar
        localizer={momentLocalizer(moment)}
        events={parseEvents(list)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        onSelectSlot={(event) => {console.log(event)}}
        onSelectEvent={(event) => handleSelectedEvent(event)}
        views={['month']}
      />
      <EventModal event={selectedEvent} show={modalState}></EventModal>
    </div>
  );
}

/*<div>
{list.map((event: Event) => 
  <div key={event.id}>{event.id} / {event.title} / {event.description} / {event.start_ts} / {event.end_ts}</div>
)}
</div>*/

export default BigCalendar;