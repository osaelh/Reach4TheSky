import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../App/Common/Form/MyTextInput";
import MyTextArea from "../../../App/Common/Form/MyTextArea";
import MySelectInput from "../../../App/Common/Form/MySelectInput";
import { categoryOption } from "../../../App/Common/Options/CategoryOptions";
import MyDateInput from "../../../App/Common/Form/MyDateInput";
import { EventFormValues } from "../../../App/Models/Event";
import { v4 as uuid } from 'uuid';





export default observer( function EventForm(){

    const {eventStore} = useStore();
    const{updateEvent, loading,createEvent, loadEventById}= eventStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();
    const [event, setEvent] = useState<EventFormValues>(new EventFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('the title is required'),
        description: Yup.string().required('The description is required'),
        categories: Yup.string().required('the category is required').nullable(),
        date: Yup.string().required('The date is required'),
        region: Yup.string().required('The region is required')
    })

    useEffect(()=>{
        if (id) {
            loadEventById(id).then(event => setEvent(new EventFormValues(event)))
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


    function handleFormSubmit(event: EventFormValues){
        console.log(event);
        if (!event.id) {
            // let newEvent = {
            //     ...event,
            //     id : uuid()
            // }
            let newEvent = event;
            newEvent.id = uuid();
            createEvent(newEvent).then(()=> history.push(`/events/${event.id}`));
        } else {
            updateEvent(event).then(()=> history.push(`/events/${event.id}`));
        }
    }

    // function handleInputChange(Event : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = Event.target;
    //     setEvent({...event,[name]: value});
    // }

    if (loading) {
        return <LoadingComponent content='loading event...'/>
    }

    return(
        <Segment clearing>
            <Header content='Event details' subheader color='teal'/>
            <Formik enableReinitialize
             initialValues={event}
              onSubmit={values => handleFormSubmit(values)}
              validationSchema={validationSchema}>
                {({handleSubmit, isValid, isSubmitting, dirty})=>
                              <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                  <MyTextInput placeholder='Title' name='title'/>
                                  <MyTextArea rows={3} placeholder='Description' name='description'/>
                                  <MySelectInput placeholder='Category' name='categories' options={categoryOption}/>
                                  <MyDateInput 
                                  placeholderText='Date'
                                  name='date'
                                  showTimeSelect
                                  timeCaption='time'
                                  dateFormat='MMMM d, yyy h:mm aa'
                                  />
                                   <Header content='Location details' subheader color='teal'/>
                                  <MyTextInput placeholder='Region'  name='region'/>
              
                                  <Button
                                   disabled={isSubmitting || !dirty || !isValid}
                                   loading={isSubmitting}
                                   floated='right' positive type='submit' content='Submit'
                                   
                                  />
                                  <Button as={Link} to='/events' floated='right'  type='submit' content='Cancel' />
                          </Form>
                }
            </Formik>
        </Segment>

    )
})