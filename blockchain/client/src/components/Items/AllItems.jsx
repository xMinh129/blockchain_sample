import React from 'react';
import {Link} from 'react-router';
import {Card} from 'material-ui/Card';
import LoadingBox from '../Utilities/LoadingBox.jsx';
import apiRequest from '../../api_methods.jsx';

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: false
        };

    }


    componentDidMount() {
    }

    componentWillMount() {

    }

    componentDidUpdate() {

    }

    render() {

        if (this.state.data) {
            return (
                <Card></Card>

            )
        } else {
            return (
                <LoadingBox/>
            )
        }

    }
}

export default Items;


