import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Label } from 'semantic-ui-react';
import MyTextInput from '../../App/Common/Form/MyTextInput';
import { useStore } from '../../App/Stores/store';


export default observer( function LoginForm(){

    const {userStore} = useStore()
    return (
        <Formik
        initialValues={{username : '', password: '',error:null}}
        onSubmit={(values, {setErrors}) => userStore.login(values).catch(err => setErrors({error: "Invalid email or username" }))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage name='error'
                      render={()=> <Label style={{marginBottom: '10px'}} color='red' basic content={errors.error} />}
                      />
                    <Button loading={isSubmitting} positive content="Login" type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
}
)