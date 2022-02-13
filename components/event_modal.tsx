import { useState } from 'react'

type CalenderEvent = {
  id: number,
  title: string,
  start: string,
  end: string
}

type EventModalProps = {
  event: CalenderEvent
  show: boolean
}

const EventModal = ({
  event,
  show,
}: EventModalProps) => {
  const [modalState, setModalState] = useState(false);

  const submitEvent = async (e: any) => {
    e.preventDefault();

    debugger;

    const res = await fetch('http://localhost:3000/api/v1/events', {
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

    const result = await res.json();
  }

  return (
    <div className={`max-w-xs m-5 p-3 rounded my-2 overflow-hidden shadow-lg ${(show === true || modalState === true) ? 'block' : 'hidden'}`}>
      <button
        className="float-right mb-5 px-4 py-2 font-bold text-white bg-slate-600 rounded-full hover:bg-slate-800"
        onClick={(e) => setModalState(false)}
      >
        x
      </button>
      <div className="mb-2 text-xl font-bold">Add/Edit Event ({event.id})</div>
      <form className="flex flex-col" onSubmit={submitEvent}>
        <label className="mb-2 italic" htmlFor="title">Title:</label>
        <input className="mb-4 border-b-2" defaultValue={event.title} id="title" name="title" type="text" autoComplete="title" required />
        <label className="mb-2 italic" htmlFor="start_date">Start date:</label>
        <input className="mb-4 border-b-2" defaultValue={event.start} id="start_date" name="start_date" type="text" autoComplete="start_date" required />
        <label className="mb-2 italic" htmlFor="end_date">End date:</label>
        <input className="mb-4 border-b-2" defaultValue={event.end} id="end_date" name="end_date" type="text" autoComplete="title" required />
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default EventModal;