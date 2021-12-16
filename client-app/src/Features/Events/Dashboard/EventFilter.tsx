import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Icon, Menu } from "semantic-ui-react";
import { useStore } from "../../../App/Stores/store";


export default observer(function EventFilter(){
    const {eventStore: {predicate, setPredicate}} = useStore();
    return (
        <>
            <Menu vertical size={"large"} style={{width: '100%'}}>
              <Header attached color='teal'>
              <Icon name="filter"/>Filters
              </Header>
              <Menu.Item
               active={predicate.has('all')}
               onClick={() => setPredicate('all', 'true')}
               content='All events'/>
              <Menu.Item  
               content="I'm attending"
               active={predicate.has('isGoing')}
               onClick={() => {
                   setPredicate('isGoing', 'true')
                   console.log(predicate)
                }}
              />
              <Menu.Item 
               content="I'm hosting"
               active={predicate.has('isHost')}
               onClick={() => setPredicate('isHost', 'true')}
               />
        </Menu>
        <Header></Header>
        <Calendar onChange={(date: Date) => setPredicate('startDate', date)} value={predicate.get('startDate') || new Date()}></Calendar>
        </>

        
    )
}
)