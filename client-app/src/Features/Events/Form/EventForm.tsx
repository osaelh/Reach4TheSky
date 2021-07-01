import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";


export default observer( function EventForm(){

    const {eventStore} = useStore();
    const{updateEvent, loading,createEvent}= eventStore;

    const initialState = eventStore.selectedEvent ?? {
        id:'',
        title:'',
        description:'',
        date:'',
        region:'',
        categories: ''
    }

    const [event, setEvent] = useState(initialState);
    function handleSubmit(){
        console.log(event);
        event.id ? updateEvent(event) : createEvent(event);
    }

    function handleInputChange(Event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = Event.target;
        setEvent({...event,[name]: value});
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
                <Button onClick={eventStore.closeForm} floated='right'  type='submit' content='Cancel' />
            </Form>
        </Segment>

    )
})