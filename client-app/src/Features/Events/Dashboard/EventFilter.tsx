import React from "react";
import Calendar from "react-calendar";
import { Header, Icon, Menu } from "semantic-ui-react";


export default function EventFilter(){
    return (
        <>
            <Menu vertical size={"large"} style={{width: '100%'}}>
              <Header attached color='teal'>
              <Icon name="filter"/>Filters
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