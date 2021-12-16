import { Formik, Form, Field, FieldProps } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Comment, Loader } from 'semantic-ui-react';
import { useStore } from '../../../App/Stores/store';
import * as Yup from 'yup';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

interface Props {
    eventId: string;
}

export default observer(function ActivityDetailedChat({ eventId }: Props) {

    const { commentStore } = useStore();
    useEffect(() => {
        if (eventId) {
            commentStore.createHubConnection(eventId);
        }
        return () => {
            commentStore.clearComment()
        }
    }, [commentStore, eventId])

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
            <Formik
                        onSubmit={(values, { resetForm }) => commentStore.addComment(values).then(() => resetForm())}
                        initialValues={{ body: "" }}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}                   >
                        {({ isSubmitting, isValid, handleSubmit }) => (
                            <Form className="ui form">
                                <Field name='body'>
                                    {(props: FieldProps) => (
                                        <div>
                                            <Loader active={isSubmitting}/>
                                                <textarea
                                                    placeholder='Enter to submit your comment, Enter + shift for new line'
                                                    rows={2}
                                                    {...props.field}
                                                    onKeyPress={e => {
                                                        if (e.key === 'Enter' && e.shiftKey) {
                                                            return;
                                                        }
                                                        if (e.key === 'Enter' && !e.shiftKey) {
                                                            e.preventDefault();
                                                            isValid && handleSubmit();
                                                        }
                                                    }}
                                                />                                    
                                        </div>
                                        )}
                                </Field>
                            </Form>
                              )}
                          </Formik>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profiles/${comment.username}`}>{comment.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{formatDistanceToNow(new Date(comment.createdAt))}</div>
                                </Comment.Metadata>
                                <Comment.Text style={{whiteSpace: 'pre-wrap'}}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                        ))}
                </Comment.Group>
            </Segment>
        </>

    )
})