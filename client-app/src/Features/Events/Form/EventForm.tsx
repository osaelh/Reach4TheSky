import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IEvent } from "../../../App/Models/Event";

interface IProps{
    event: IEvent | undefined;
    closeForm:()=>void;
}

export default function EventForm({event, closeForm}: IProps){
    return(
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title'/>
                <Form.TextArea placeholder='Description'/>
                <Form.Input placeholder='Category'/>
                <Form.Input placeholder='Date'/>
                <Form.Input placeholder='Region'/>

                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right'  type='submit' content='Cancel' />
            </Form>
        </Segment>

    )
}