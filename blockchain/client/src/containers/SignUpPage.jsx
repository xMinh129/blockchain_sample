import React, {PropTypes} from 'react';
import SignUpForm from '../components/Main/SignUpForm.jsx';


class SignUpPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: '',
                userName: '',
                password: '',
                fullName: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {

        event.preventDefault();

        // create a string for an HTTP body message
        const fullName = encodeURIComponent(this.state.user.fullName);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const userName = encodeURIComponent(this.state.user.userName);
        const formData = `fullName=${fullName}&email=${email}&password=${password}&userName=${userName}`;


        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5010/api/users/new');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // success
                // change the component-container state
                this.setState({
                    errors: {}
                });

                console.log(xhr.response);
                // set a message
                localStorage.setItem('successMessage', xhr.response.message);

                // make a redirect
                this.context.router.replace('/login');
            } else {
                // failure

                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        );
    }

}

SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;
