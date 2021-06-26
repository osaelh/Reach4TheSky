import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface IProps{
    openForm:()=>void;
}

export default function NavBar({openForm}: IProps){
    return (
        <Menu inverted fixed="top">
            <Container >
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight: '50px'}}></img>

                </Menu.Item>
                <Menu.Item name="Events"/>
                <Menu.Item>
                    <Button onClick={openForm} positive content='Create Event'/>
                </Menu.Item>
            </Container>

        </Menu>
    )
}