import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../App/Common/Form/MyTextInput";
import MyTextArea from "../../../App/Common/Form/MyTextArea";
import MySelectInput from "../../../App/Common/Form/MySelectInput";
import { categoryOption } from "../../../App/Common/Options/CategoryOptions";
import MyDateInput from "../../../App/Common/Form/MyDateInput";




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
        title: Yup.string().required('the title is required'),
        description: Yup.string().required('The description is required'),
        categories: Yup.string().required('the category is required'),
        date: Yup.string().required('The date is required'),
        region: Yup.string().required('The region is required')
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
                                  <MyTextInput placeholder='Region'  name='region'/>
              
                                  <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                                  <Button as={Link} to='/events' floated='right'  type='submit' content='Cancel' />
                          </Form>
                }
            </Formik>
        </Segment>

    )
})