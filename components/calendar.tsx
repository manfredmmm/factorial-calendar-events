import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import { useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

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
  const [selectedEvent, setSelectedEvent] = useState({
    id: 0, 
    title: '',
    start: moment().unix().toString(),
    end: moment().add(1, 'h').unix().toString()
  });
  const [modalState, setModalState] = useState(false);
  const [formType, setFormType] = useState('create');
  const [counter, updateCounter] = useState(0);
  const [errors, setErrors] = useState('');
  const API_URL = "https://factorial-api-events.herokuapp.com/api/v1/events";

  // http://localhost:3000/api/v1/events
  // https://factorial-api-events.herokuapp.com/api/v1/events

  useEffect(() => {
    moment.tz.setDefault("Europe/Madrid");
    fetch(`${API_URL}`)
      .then(response => response.json())
      .then(setList);
  }, [counter]);

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
    setFormType("create");
    setErrors('');
    setModalState(true);
  }

  const closeModal = () => {
    let event = {
      id: 0,
      title: '',
      start: moment().unix().toString(),
      end: moment().add(1, 'h').unix().toString(),
    }
    setErrors('');
    setSelectedEvent(event);
    setModalState(false);
  }
  
  const handleSelectedEvent = (event: CalenderEvent) => {
    event.start = moment(event.start).unix().toString();
    event.end = moment(event.end).unix().toString();
    setSelectedEvent(event);
    setFormType("update");
    setErrors('');
    setModalState(true);
  }

  const deleteEvent = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/${selectedEvent.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    const result = await res;
    if (result.status === 204) {
      updateCounter(counter+1);
      setModalState(false);
    } else {
      setErrors(result.statusText);
    }
  }

  const submitEvent = async (e: any) => {
    e.preventDefault();
    if (formType === "create") {
      const res = await fetch(`${API_URL}}`, {
        body: JSON.stringify({
          title: e.target.title.value,
          start_date: e.target.start_date.value,
          end_date: e.target.end_date.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      const result = await res;
      if (result.status === 201) {
        updateCounter(counter+1);
        setModalState(false); 
      } else {
        setErrors(result.statusText);
      }
    } else if (formType === "update") {
      const res = await fetch(`${API_URL}/${selectedEvent.id}`, {
        body: JSON.stringify({
          title: e.target.title.value,
          start_date: e.target.start_date.value,
          end_date: e.target.end_date.value,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      });
      const result = await res;
      if (result.status === 200) {
        updateCounter(counter+1);
        setModalState(false);
      } else {
        setErrors(result.statusText);
      }
    }
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
      <div className={`max-w-xs fixed bg-slate-400 w-80	top-20 left-20 z-10	p-3 rounded my-2 overflow-hidden shadow-lg ${(modalState === true) ? 'block' : 'hidden'}`}>
        <button
          className="float-right mb-5 px-4 py-2 font-bold text-white bg-slate-600 rounded-full hover:bg-slate-800"
          onClick={closeModal}
        >
          x
        </button>
        <div className="mb-2 text-xl font-bold">Edit event ({selectedEvent.id})</div>
        <form className="flex flex-col" onSubmit={submitEvent}>
          <label className="mb-2 italic" htmlFor="title">Title:</label>
          <input className="mb-4 border-b-2" defaultValue={selectedEvent.title} id="title" name="title" type="text" autoComplete="title" required />          
          <label className="mb-2 italic" htmlFor="start_date">Start date:</label>
          <input className="mb-4 border-b-2" defaultValue={selectedEvent.start} id="start_date" name="start_date" type="text" autoComplete="start_date" required />
          <label className="mb-2 italic" htmlFor="end_date">End date:</label>
          <input className="mb-4 border-b-2" defaultValue={selectedEvent.end} id="end_date" name="end_date" type="text" autoComplete="title" required />
          <div className={`${errors === '' ? 'hidden' : 'block'} w-full text-white bg-red-400 rounded mb-3 px-8 py-3`}>
            {errors}
          </div>
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            className={`${formType === 'update' ? 'block' : 'hidden'} px-4 mt-2 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700`}
            onClick={deleteEvent}
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

/*
<EventModal event={selectedEvent} show={modalState}></EventModal>*/

export default BigCalendar;