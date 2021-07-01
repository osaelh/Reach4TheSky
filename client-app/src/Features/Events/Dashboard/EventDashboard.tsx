
import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";
import { useStore } from "../../../App/Stores/store";
import EventDetails from "../Details/EventDetails";
import EventForm from "../Form/EventForm";
import EventsList from "./EventsList";

interface IProps{
    events : IEvent[];
    deleteEvent:(id: string)=>void;
    submitting: boolean;
}

export default observer(function EventDashboard({events,
     deleteEvent, submitting}: IProps){
        const{eventStore} = useStore()
        const{ selectedEvent,editMode} = eventStore;
    return (

       
        <Grid>
            <Grid.Column width="10" >
            <EventsList
             events={events}
            
             deleteEvent={deleteEvent}
             submitting={submitting}/>

            </Grid.Column>
            <Grid.Column width="6">
                {selectedEvent && !editMode &&
                <EventDetails />}
                 {editMode &&
                    <EventForm />
                 }
                
            </Grid.Column>
        </Grid>
    )
} )  