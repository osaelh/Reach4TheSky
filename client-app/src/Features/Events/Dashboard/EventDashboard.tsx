
import React from "react";
import { Grid } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";
import EventDetails from "../Details/EventDetails";
import EventForm from "../Form/EventForm";
import EventsList from "./EventsList";

interface IProps{
    events : IEvent[];
    selectedEvent: IEvent | undefined;
    selectEvent: (id:string) => void;
    cancelSelectEvent: ()=> void;
}

export default function EventDashboard({events,selectedEvent, selectEvent,cancelSelectEvent}: IProps){
    return (
        <Grid>
            <Grid.Column width="10" >
            <EventsList events={events} selectEvent={selectEvent}/>

            </Grid.Column>
            <Grid.Column width="6">
                {selectedEvent &&
                <EventDetails event={selectedEvent} cancelSelectEvent={cancelSelectEvent}/>}
                <EventForm/>
            </Grid.Column>
        </Grid>
    )
} 