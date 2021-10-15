
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";
import EventsList from "./EventsList";



export default observer(function EventDashboard(){
        const{eventStore} = useStore();
        const {loadEvents, eventsRegistry} = eventStore;

        useEffect(()=>{
         if(eventsRegistry.size <= 1)  loadEvents();
        }, [eventStore, loadEvents, eventsRegistry.size])
      
        
      
        if(eventStore.loadingInitial) return <LoadingComponent content="loading app" />
    return (

       
        <Grid>
            <Grid.Column width="10" >
            <EventsList/>

            </Grid.Column>
            <Grid.Column width="6">
               <h2>Events filter</h2>
                
            </Grid.Column>
        </Grid>
    )
} )  