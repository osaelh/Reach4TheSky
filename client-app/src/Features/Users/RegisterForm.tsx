import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../App/Common/Form/MyTextInput';
import { useStore } from '../../App/Stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';


export default observer( function RegisterForm(){

    const {userStore} = useStore()
    return (
        <Formik
        initialValues={{displayName: '', email:'' ,username : '', password: '',error:null}}
        onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => setErrors({error }))}
        validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
        })}
        >
            {({handleSubmit, isSubmitting, errors, isValid , dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to events!' color='teal'/>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='displayName' placeholder='Dispalyname' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage name='error'
                      render={()=> <ValidationErrors  errors={errors.error}/>}
                      />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content="Register" type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
}
)