
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {Grid, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../App/Models/Pagination";
import { useStore } from "../../../App/Stores/store";
import EventFilter from "./EventFilter";
import EventsList from "./EventsList";
import InfiniteScroll from 'react-infinite-scroller';
import EventListItemPlaceholder from "./eventListItemPlaceholder";






export default observer(function EventDashboard(){
        const{eventStore} = useStore();
        const {loadEvents, eventsRegistry, setPagingParams, pagination} = eventStore;
        const [loadingNext, setLoadingNext] = useState(false);

        function handleLoadingNext(){
            setLoadingNext(true);
            setPagingParams(new PagingParams(pagination!.currentPage + 1));
            loadEvents().then(() => setLoadingNext(false));
        }

        useEffect(()=>{
         if(eventsRegistry.size <= 1)  loadEvents();
        }, [eventStore, loadEvents, eventsRegistry.size])
      
        
    return (

       
        <Grid reversed='computer'>         
            <Grid.Column computer={6} tablet={16} mobile={16}>
               <h2>Events filter</h2>
                <EventFilter/>
            </Grid.Column>
             <Grid.Column computer={10} mobile={16} tablet={16}>
                {eventStore.loadingInitial && ! loadingNext ? (
                    <>
                      <EventListItemPlaceholder/>
                      <EventListItemPlaceholder/>
                    </>
                ) : 
                <InfiniteScroll
                pageStart={0}
                loadMore={handleLoadingNext}
                hasMore={!loadingNext && !! pagination && pagination.currentPage < pagination.totalPages}
                initialLoad={false}>
                    <EventsList/>
                </InfiniteScroll>
                }     
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext}/>
            </Grid.Column>
        </Grid>
    )
} )  