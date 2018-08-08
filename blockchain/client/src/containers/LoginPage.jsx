import React, {PropTypes} from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/Main/LoginForm.jsx';


class LoginPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        // set the initial component state
        this.state = {
            errors: {},
            successMessage,
            user: {
                userName: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {

        event.preventDefault();

        const userName = encodeURIComponent(this.state.user.userName);
        const password = encodeURIComponent(this.state.user.password);

        const formData = `userName=${userName}&password=${password}`;

        //TODO use axios to make http request in the future

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', 'http://localhost:5010/api/users');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                this.setState({
                    errors: {}
                });

                // save the token and user data
                Auth.authenticateUser(xhr.response.token, xhr.response.user);


                // change the current URL to /
                this.context.router.replace('/');
            } else {
                // failure

                // change the component state
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
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                user={this.state.user}
            />
        );
    }

}

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginPage;
