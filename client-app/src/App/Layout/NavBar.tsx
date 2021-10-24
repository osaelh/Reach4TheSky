import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import { useStore } from "../Stores/store";


export default observer( function NavBar(){

    const {userStore: {user, logout}} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container >
                <Menu.Item exact as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="Logo" style={{marginRight: '50px'}}></img>

                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name="Events"/>
                <Menu.Item as={NavLink} to='/errors' name="Test errors"/>
                <Menu.Item>
                    <Button as={NavLink} to='/createEvent' positive content='Create Event'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || 'assets/user.png'} avatar spaced='right'/>
                    <Dropdown inverted='true' pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                           <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My profile' icon='user' />
                           <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>

        </Menu>
    )
}
)