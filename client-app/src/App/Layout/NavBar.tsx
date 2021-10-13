import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";


export default function NavBar(){

    return (
        <Menu inverted fixed="top">
            <Container >
                <Menu.Item exact as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight: '50px'}}></img>

                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name="Events"/>
                <Menu.Item>
                    <Button as={NavLink} to='/createEvent' positive content='Create Event'/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}