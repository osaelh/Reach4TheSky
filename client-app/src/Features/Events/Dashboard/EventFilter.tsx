import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function EventFilter(){
    return (
        <>
            <Menu vertical size={"large"} style={{width: '100%'}}>
              <Header icon='filter' attached color='teal'>
                Filters
              </Header>
              <Menu.Item content='All events'/>
              <Menu.Item content="I'm attending"/>
              <Menu.Item content="I'm hosting"/>
        </Menu>
        <Header></Header>
        <Calendar></Calendar>
        </>

        
    )
}