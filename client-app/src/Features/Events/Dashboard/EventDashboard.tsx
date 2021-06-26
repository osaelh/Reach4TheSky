
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
    editMode : boolean;
    openForm:(id: string) => void;
    closeForm:()=>void;
}

export default function EventDashboard({events,selectedEvent, selectEvent,cancelSelectEvent, editMode,openForm,closeForm}: IProps){
    return (
        <Grid>
            <Grid.Column width="10" >
            <EventsList events={events} selectEvent={selectEvent}/>

            </Grid.Column>
            <Grid.Column width="6">
                {selectedEvent && !editMode &&
                <EventDetails
                 event={selectedEvent} 
                 cancelSelectEvent={cancelSelectEvent}
                 openForm={openForm}                 
                 />}
                 {editMode &&
                    <EventForm closeForm={closeForm} event={selectedEvent}/>
                 }
                
            </Grid.Column>
        </Grid>
    )
} 