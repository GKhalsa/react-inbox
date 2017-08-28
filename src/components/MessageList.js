import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
import MessageSeeds from './messageSeeds'

export default class MessageList extends Component {

    state = {
        messages:MessageSeeds
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
                                                         />) }
            </div>
        )

    }
}


