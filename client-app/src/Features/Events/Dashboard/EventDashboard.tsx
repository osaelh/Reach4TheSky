
import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";
import EventDetails from "../Details/EventDetails";
import EventForm from "../Form/EventForm";
import EventsList from "./EventsList";



export default observer(function EventDashboard(){
        const{eventStore} = useStore()
        const{ selectedEvent,editMode} = eventStore;
    return (

       
        <Grid>
            <Grid.Column width="10" >
            <EventsList/>

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