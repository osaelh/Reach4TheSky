import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

export default function EventForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title'/>
                <Form.TextArea placeholder='Description'/>
                <Form.Input placeholder='Category'/>
                <Form.Input placeholder='Date'/>
                <Form.Input placeholder='Region'/>

                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right'  type='submit' content='Cancel' />
            </Form>
        </Segment>

    )
}