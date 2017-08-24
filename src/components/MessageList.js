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

    toggleStarring = (id) => {
        //refactor to use id not index!
        const newMessages = [...this.state.messages]
        newMessages[id - 1].starred = !newMessages[id - 1].starred
        this.setState({messages: newMessages})
    }

    toggleSelect = (id) => {
        const newMessages = [...this.state.messages]
        newMessages[id - 1].selected = !newMessages[id - 1].selected
        this.setState({ messages: newMessages })
    }

    selectedCount = () => {
        return this.state.messages.filter((message) => message.selected).length
    }

    totalMessageCount = () => {
        return this.state.messages.length
    }

    selectDeselect = () => {
        if (this.selectedCount() === this.totalMessageCount()) {
            const newMessages = this.state.messages.map((message) => {return { ...message, selected: false }})
            this.setState({messages:newMessages})
        } else {
            const newMessages = this.state.messages.map((message) => { return { ...message, selected: true } })
            // const newMessages = this.state.messages.map((message) => { return { ...message, [selected]: true } })
            this.setState({ messages: newMessages })
        }       
    }

    markAsRead = () => {
        
        const markedRead = this.state.messages.map((message) => {
            if(message.selected){
                return {...message, read: true}
            }
            return message
        });
        this.setState({messages:markedRead})   
        
    }

    markAsUnread = () => {
        const markedUnread = this.state.messages.map((message) => {
            if (message.selected) {
                return { ...message, read: false }
            }
            return message
        });
        this.setState({ messages: markedUnread })   
    }

    deleteSelectedMessages = () => {
        const newMessages = this.state.messages.filter((message) => {return !message.selected})
        this.setState({messages:newMessages})
    }

    unreadMessageCount = () => {
        return this.state.messages.filter((message) => {return !message.read}).length
    }

    render(){
        
        return (
            <div>
                <Toolbar
                 selectedCount={this.selectedCount}
                 totalMessageCount={this.totalMessageCount}
                 selectDeselect={this.selectDeselect}
                 markAsRead={this.markAsRead}
                 markAsUnread={this.markAsUnread}
                 deleteSelectedMessages={this.deleteSelectedMessages}
                 unreadMessageCount={this.unreadMessageCount()}
                 />

                {this.state.messages.map((message,i) => <Message 
                                                         key={i} 
                                                         toggleSelect={this.toggleSelect}
                                                         selected={message.selected}
                                                         id={message.id}
                                                         subject={message.subject}
                                                         starred={message.starred}
                                                         toggleStarring={this.toggleStarring}
                                                         read={message.read}
                                                         labels={message.labels}
                                                         />) }
            </div>
        )

    }
}


