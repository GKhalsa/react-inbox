import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
import MessageSeeds from './messageSeeds'

export default class MessageList extends Component {

    state = {
        messages:[]
    }

    componentDidMount = async() => {
        const response = await fetch("http://localhost:8082/api/messages")
        const json = await response.json()
        this.setState({ messages: json._embedded.messages})
    }

    updateStar = async(id) => {
        let message = this.state.messages.filter((message) => {return message.id === id})
        const response = await fetch("http://localhost:8082/api/messages", {
            method: 'PATCH',
            body: JSON.stringify({
                "messageIds": [id],
                "command": "star",
                "star": !message[0].starred
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        }) 
        this.toggleAttribute(id,"starred")
        
    }

    toggleAttribute = (id, attribute) => {
        const updatedMessages = this.state.messages.map((message) => {
            if(message.id === id){return {...message, [attribute]: !message[attribute]}}
            return message
        })
        this.setState({messages: updatedMessages}) 
    }

    selectedCount = () => {
        return this.state.messages.filter((message) => message.selected).length
    }

    totalMessageCount = () => {
        return this.state.messages.length
    }

    updateSelection = (booleanValue) => {
        return this.state.messages.map((message) => { return { ...message, selected: booleanValue } })
    }

    selectDeselect = () => {
        let newMessages;
        if (this.selectedCount() === this.totalMessageCount()) {
            newMessages = this.updateSelection(false)
        } else {
            newMessages = this.updateSelection(true)
        }       
      
        this.setState({ messages: newMessages })
    }

    markAsReadOrUnread = (booleanValue) => {
        const markedReadOrUnread = this.state.messages.map((message) => {if (message.selected) {return { ...message, read: booleanValue }}
            return message
        });
        this.setState({ messages: markedReadOrUnread })   
    }

    
    updateReadOrUnread = async(booleanValue) => {
        const ids = this.state.messages.map((message) => {if (message.selected) {return message.id}return})
        const noUndefinedIds = ids.filter(Number)
        
        // this.state.messages.map((message) => {
            // if (message.selected) {
                const response = await fetch("http://localhost:8082/api/messages",{
                    method: 'PATCH',
                    body: JSON.stringify({
                        "messageIds": [...noUndefinedIds],
                        "command": "read",
                        "read": booleanValue
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                })
            // }
        // })
        this.markAsReadOrUnread(booleanValue)

    }

    deleteSelectedMessages = () => {
        const newMessages = this.state.messages.filter((message) => {return !message.selected})
        this.setState({messages:newMessages})
    }

    unreadMessageCount = () => {
        return this.state.messages.filter((message) => {return !message.read}).length
    }

    addLabelToSelected = (e) => {
        const label = e.target.value 
        
        const messagesWithUpdatedLabel = this.state.messages.map((message) => {
            if (message.selected) { return { ...message, labels: [...new Set([...message.labels, label])] }}
            return message
        })
        
        this.setState({messages: messagesWithUpdatedLabel})
    }

    removeElementFromArray = (array, element) => {
        return array.filter((label) => {return label != element})
    }

    removeLabelOnSelected = (e) => {
        const label = e.target.value

        const messagesWithUpdatedLabel = this.state.messages.map((message) => {
            const updatedLabels = this.removeElementFromArray(message.labels, label)
            if (message.selected) { return { ...message, labels: updatedLabels } }
            return message
        })

        this.setState({ messages: messagesWithUpdatedLabel })
    }

    render(){
        
        return (
            <div>
                <Toolbar
                 selectedCount={this.selectedCount}
                 totalMessageCount={this.totalMessageCount}
                 selectDeselect={this.selectDeselect}
                 markAsReadOrUnread={this.markAsReadOrUnread}
                 updateReadOrUnread={this.updateReadOrUnread}
                 deleteSelectedMessages={this.deleteSelectedMessages}
                 unreadMessageCount={this.unreadMessageCount()}
                 addLabelToSelected={this.addLabelToSelected}
                 removeLabelOnSelected={this.removeLabelOnSelected}
                 />

                {this.state.messages.map((message,i) => <Message 
                                                         key={i} 
                                                         selected={message.selected}
                                                         id={message.id}
                                                         subject={message.subject}
                                                         starred={message.starred}
                                                         toggleAttribute={this.toggleAttribute}
                                                         read={message.read}
                                                         labels={message.labels}
                                                         updateStar={this.updateStar}
                                                         />) }
            </div>
        )

    }
}


