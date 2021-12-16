import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Item } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";
import EventListItem from "./EventListItem";


export default observer(function EventsList(){

    const {eventStore} = useStore();
    const {groupedEvents} = eventStore;
    


    return (
        <>
           {groupedEvents.map((e)=>(
               <Fragment key={e[0]}>
                   <Header sub color='teal'>
                       {e[0]}
                   </Header>
                 
            <Item.Group divided>
                {e[1].map(event =>
                    (
                        <EventListItem key={event.id} event={event}/>
    ))}
            </Item.Group>
      
               </Fragment>
           ))}
        </>
       

    )
}
)
