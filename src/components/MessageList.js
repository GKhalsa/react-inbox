import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
// import generateData from '../messageSeeds.js'

export default class MessageList extends Component {

    state = {
        messages:[
            {
                "id": 1,
                "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
                "read": false,
                "starred": true,
                "labels": ["dev", "personal"]
            },
            {
                "id": 2,
                "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
                "read": false,
                "starred": false,
                "selected": true,
                "labels": []
            },
            {
                "id": 3,
                "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
                "read": false,
                "starred": true,
                "labels": ["dev"]
            },
        ]
    }

    // componentDidMount(){
    //     this.setState({messages: generateData()})
    // }

    render(){
        debugger;
        return (
            <div>
                <Toolbar />
                {this.state.messages.map((message) => <Message id={message.id} subject={message.subject} starred={message.starred}/>) }
            </div>
        )

    }
}


