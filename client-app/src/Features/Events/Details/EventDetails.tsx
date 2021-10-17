import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";


export default observer(function ActivityDetails(){
  const {eventStore} = useStore();
  const {selectedEvent: event, loadEventById, loadingInitial} = eventStore;
  const {id} = useParams<{id: string}>();

  useEffect(()=> {
    if (id) loadEventById(id);
  },[id, loadEventById]);

  if(!event || loadingInitial) return <LoadingComponent/>;
    return (
       <Grid>
         <Grid.Column width={10}>
           <EventDetailedHeader event={event}/>
           <EventDetailedInfo event={event}/>
           <EventDetailedChat/>
         </Grid.Column>
         <Grid.Column width={6}>
           <EventDetailedSideBar/>
         </Grid.Column>
       </Grid>
    )
}
)