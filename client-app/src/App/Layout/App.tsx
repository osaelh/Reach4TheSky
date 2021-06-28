import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import { IEvent } from '../Models/Event';
import NavBar from './NavBar';
import EventDashboard from '../../Features/Events/Dashboard/EventDashboard';
import { Container } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid';
import agent from '../Api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

  const [events, setEvents] = useState<IEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(()=> {
    agent.events.list().then(response => {
      console.log(response);
      let events: IEvent[] = [];
      response.forEach(event=> {
        event.date = event.date.split('T')[0];
        events.push(event);
      }) 
      setEvents(events);
      setLoading(false);
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
    setSubmitting(true)
    if(event.id){
      agent.events.update(event).then(()=>{
        setEvents([...events.filter(x=> x.id !== event.id), event]);
        setSelectedEvent(event);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      event.id= uuid();
      agent.events.create(event).then(()=> {
        setEvents([...events, event]);
        setSelectedEvent(event);
        setEditMode(false);
        setSubmitting(false);
      })
    }

  }

  function handleDeleteEvent(id: string){
    setSubmitting(true);
    agent.events.delete(id).then(()=>{
    setEvents([...events.filter(x=> x.id !== id)]);
    setSubmitting(false);
    })
 
  }
  if(loading) return <LoadingComponent content="loading app" />
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
      submitting={submitting}
      ></EventDashboard>
     </Container>



    </>
  );
}

export default App;
