import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../App/Layout/LoadingComponent";
import { useStore } from "../../../App/Stores/store";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSideBar from "./EventDetailedSideBar";


export default observer(function ActivityDetails(){
  const {eventStore} = useStore();
  const {selectedEvent: event, loadEventById, loadingInitial, clearSelectedEvent} = eventStore;
  const {id} = useParams<{id: string}>();

  useEffect(()=> {
    if (id) loadEventById(id);
    return () => clearSelectedEvent();
  },[id, loadEventById, clearSelectedEvent]);

  if(!event || loadingInitial) return <LoadingComponent/>;
    return (
       <Grid>
         <Grid.Column computer={10} tablet={16} mobile={16}>
           <EventDetailedHeader event={event}/>
                <EventDetailedInfo event={event} />
                <EventDetailedChat eventId={event.id} />
         </Grid.Column>
         <Grid.Column computer={6} tablet={16} mobile={16}>
           <EventDetailedSideBar event={event}/>
         </Grid.Column>
       </Grid>
    )
}
)