import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";
import { v4 as uuid } from "uuid";



export default observer( function EventForm(){

    const {eventStore} = useStore();
    const{updateEvent, loading,createEvent, loadEventById}= eventStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();
    const [event, setEvent] = useState({
        id:'',
        title:'',
        description:'',
        date:'',
        region:'',
        categories: ''
    });

    useEffect(()=>{
        if (id) {
            loadEventById(id).then(event => setEvent(event!))
        }
    },[id, loadEventById])

    // const initialState = eventStore.selectedEvent ?? {
    //     id:'',
    //     title:'',
    //     description:'',
    //     date:'',
    //     region:'',
    //     categories: ''
    // }


    function handleSubmit(){
        console.log(event);
        if (event.id.length === 0) {
            let newEvent = {
                ...event,
                id: uuid()
            }
            createEvent(newEvent).then(()=> history.push(`/events/${event.id}`));
        } else {
            updateEvent(event).then(()=> history.push(`/events/${event.id}`));
        }
    }

    function handleInputChange(Event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = Event.target;
        setEvent({...event,[name]: value});
    }

    if (loading) {
        return <LoadingComponent content='loading event...'/>
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={event.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={event.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category'  value={event.categories} name='categories' onChange={handleInputChange}/>
                <Form.Input placeholder='Date' type="date" value={event.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='Region' value={event.region} name='region' onChange={handleInputChange}/>

                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/events' floated='right'  type='submit' content='Cancel' />
            </Form>
        </Segment>

    )
})