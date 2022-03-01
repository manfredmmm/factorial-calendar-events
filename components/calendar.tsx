import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import { useEffect, useState, useContext } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'
import EventModal from 'components/event_modal'
import { ModalContext } from 'components/context/ModalContext'

type Event = {
  id: number;
  title: string;
  description: string;
  start_ts: number;
  end_ts: number;
}

type CalendarEvent = {
  id: number;
  title: string;
  start: any;
  end: any;
}

const BigCalendar = () => {
  const [list, setList] = useState([]);
  const modalContext = useContext(ModalContext)
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState('');
  const [selectedEvent, setSelectedEvent] = useState({
    id: 0, 
    title: '',
    start: moment().unix().toString(),
    end: moment().add(1, 'h').unix().toString()
  });

  const API_URL = "http://localhost:3000/api/v1/events";
  // const API_URL = "https://factorial-api-events.herokuapp.com/api/v1/events";

  useEffect(() => {
    fetch(`${API_URL}`)
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

  const createEvent = () => {
    modalContext.formType = 'create';
    setErrors('');
    setShowModal(true);
  }
  
  const handleSelectedEvent = (event: CalendarEvent) => {
    event.start = moment(event.start).unix();
    event.end = moment(event.end).unix();
    setSelectedEvent(event);
    modalContext.formType = 'update';
    setErrors('');
    setShowModal(true);
  }
  
  return(
    <div className="bg-white">
      <button 
        className="float-right px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
        onClick={createEvent}
      >
        Create Event
      </button>
      <Calendar
        localizer={momentLocalizer(moment)}
        events={parseEvents(list)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        onSelectEvent={(event) => handleSelectedEvent(event)}
        views={['month']}
      />
      <EventModal 
        event={selectedEvent}
        eventsList={list}
        showModal={showModal}
        setShowModal={setShowModal}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  );
}

export default BigCalendar;