import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { error } from "console";




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

    const validationSchema = Yup.object({
        title: Yup.string().required('the title is required')
    })

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


    // function handleSubmit(){
    //     console.log(event);
    //     if (event.id.length === 0) {
    //         let newEvent = {
    //             ...event,
    //             id: uuid()
    //         }
    //         createEvent(newEvent).then(()=> history.push(`/events/${event.id}`));
    //     } else {
    //         updateEvent(event).then(()=> history.push(`/events/${event.id}`));
    //     }
    // }

    // function handleInputChange(Event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = Event.target;
    //     setEvent({...event,[name]: value});
    // }

    if (loading) {
        return <LoadingComponent content='loading event...'/>
    }

    return(
        <Segment clearing>
            <Formik enableReinitialize
             initialValues={event}
              onSubmit={values => console.log(values)}
              validationSchema={validationSchema}>
                {({handleSubmit})=>
                              <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                              <FormField>    
                              <Field placeholder='Title'  name='title'/>
                              <ErrorMessage name='title' render={error=><Label basic color='red' content={error}/>}></ErrorMessage>
                              </FormField>
                              <Field placeholder='Description' name='description'/>
                              <Field placeholder='Category'  name='categories' />
                              <Field placeholder='Date' type="date"  name='date'/>
                              <Field placeholder='Region'  name='region'/>
              
                              <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                              <Button as={Link} to='/events' floated='right'  type='submit' content='Cancel' />
                          </Form>
                }
            </Formik>
        </Segment>

    )
})