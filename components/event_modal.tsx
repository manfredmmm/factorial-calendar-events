import { useState, useContext } from 'react'
import { ModalContext } from 'components/context/ModalContext'
import moment from 'moment'
import 'moment-timezone'

type CalenderEvent = {
  id: number,
  title: string,
  start: string,
  end: string
}

type EventModalProps = {
  event: CalenderEvent
}

const EventModal = ({
  event,
}: EventModalProps) => {
  const modalContext = useContext(ModalContext);

  const API_URL = "http://localhost:3000/api/v1/events";
  // const API_URL = "https://factorial-api-events.herokuapp.com/api/v1/events";

  const closeModal = () => {
    modalContext.errors = '';
    modalContext.show = false;

    debugger;
  }

  const deleteEvent = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/${event.id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    });
    const result = await res;
    if (result.status === 204) {
      // updateCounter(counter+1);
      modalContext.show = false;
    } else {
      modalContext.errors = result.statusText;
    }
  }

  const submitEvent = async (e: any) => {
    e.preventDefault();
    if (modalContext.formType === "create") {
      const res = await fetch(`${API_URL}`, {
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
        // updateCounter(counter+1);
        modalContext.show = false;
      } else {
        modalContext.errors = result.statusText;
      }
    } else if (modalContext.formType === "update") {
      const res = await fetch(`${API_URL}/${event.id}`, {
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
        // updateCounter(counter+1);
        modalContext.show = false;
      } else {
        modalContext.errors = result.statusText;
      }
    }
  }

  return (
   <div className={`max-w-xs fixed bg-slate-400 w-80	top-20 left-20 z-10	p-3 rounded my-2 overflow-hidden shadow-lg ${modalContext.show ? 'block' : 'hidden'}`}>
      <button
        className="float-right mb-5 px-4 py-2 font-bold text-white bg-slate-600 rounded-full hover:bg-slate-800"
        onClick={closeModal}
      >
        x
      </button>
      <div className="mb-2 text-xl font-bold">Edit event ({event.id})</div>
      <form className="flex flex-col" onSubmit={submitEvent}>
        <label className="mb-2 italic" htmlFor="title">Title:</label>
        <input className="mb-4 border-b-2" defaultValue={event.title} id="title" name="title" type="text" autoComplete="title" required />          
        <label className="mb-2 italic" htmlFor="start_date">Start date:</label>
        <input className="mb-4 border-b-2" defaultValue={event.start} id="start_date" name="start_date" type="text" autoComplete="start_date" required />
        <label className="mb-2 italic" htmlFor="end_date">End date:</label>
        <input className="mb-4 border-b-2" defaultValue={event.end} id="end_date" name="end_date" type="text" autoComplete="title" required />
        <div className={`${modalContext.errors === '' ? 'hidden' : 'block'} w-full text-white bg-red-400 rounded mb-3 px-8 py-3`}>
          {modalContext.errors}
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          className={`${modalContext.formType === 'update' ? 'block' : 'hidden'} px-4 mt-2 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700`}
          onClick={deleteEvent}
        >
          Delete
        </button>
      </form>
    </div>
  )
}

export default EventModal;