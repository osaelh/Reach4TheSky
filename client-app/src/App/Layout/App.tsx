import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import { IEvent } from '../Models/Event';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import { Container } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';

function App() {

  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  
  useEffect(()=> {
    axios.get<IEvent[]>('http://localhost:5000/api/Events').then(response => {
      console.log(response);
      setEvents(response.data);
    })
  }, [])

  function handleSelectEvent(id: string){
    setSelectedEvent(events.find(x => x.id === id));
  }

  function handleCancelSelectEvent(){
    setSelectedEvent(undefined);
  }
 
  function handleFormOpen(id?: string){
    id ? handleSelectEvent(id) : handleCancelSelectEvent();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditEvent(event: IEvent){
    event.id 
    ? setEvents([...events.filter(x=> x.id !== event.id), event])
    : setEvents([...events, {...event, id: uuid()}]);
    setEditMode(false);
    setSelectedEvent(event);
  }

  function handleDeleteEvent(id: string){
    setEvents([...events.filter(x=> x.id !== id)])
  }

  return (
    
    <>
      <NavBar openForm={handleFormOpen}/>
     <div style={{marginTop: '5em'}}></div>
     <Container>
     <EventDashboard
      events={events}
      selectedEvent={selectedEvent}
      selectEvent={handleSelectEvent}
      cancelSelectEvent={handleCancelSelectEvent}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      createOrEditEvent={handleCreateOrEditEvent}
      deleteEvent={handleDeleteEvent}
      ></EventDashboard>
     </Container>



    </>
  );
}

export default App;
