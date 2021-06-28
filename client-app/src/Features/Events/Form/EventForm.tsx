import React, { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";

interface IProps{
    event: IEvent | undefined;
    closeForm:()=>void;
    createOrEditEvent: (event: IEvent)=> void;
    submitting: boolean
}

export default function EventForm({event: selectedEvent, closeForm, createOrEditEvent, submitting}: IProps){

    const initialState = selectedEvent ?? {
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
        createOrEditEvent(event);
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

                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right'  type='submit' content='Cancel' />
            </Form>
        </Segment>

    )
}