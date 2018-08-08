import React, {PropTypes} from 'react';
import Overview from './Overview.jsx';
import {Card} from 'material-ui/Card';
import Items from '../Items/AllItems.jsx'

const Dashboard = ({secretData, token}) => (
    <Items/>

);

// Dashboard.propTypes = {
//     secretData: PropTypes.string.isRequired,
//     token: PropTypes.string.isRequired
// };

export default Dashboard;


{/*<Card className="container">*/
}
{/*{secretData && <CardText className="notification-box" style={{fontSize: '16px', color: 'green'}}>{secretData}</CardText>}*/
}
{/*</Card>*/
}