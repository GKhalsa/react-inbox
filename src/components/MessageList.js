import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
import MessageSeeds from './messageSeeds'
import {httpUpdateStar, httpUpdateReadOrUnread, httpLabel, httpDeleteMessage, httpNewMessage} from './http'
import ComposeForm from './ComposeForm'

export default class MessageList extends Component {

    state = {
        messages:[],
        formOpen: false
    }

    componentDidMount = async() => {
        const response = await fetch("http://localhost:8082/api/messages")
        const json = await response.json()
        this.setState({ messages: json._embedded.messages})
    }

    selectedMessages = () => {
        const ids = this.state.messages.map((message) => { if (message.selected) { return message.id } return })
        return ids.filter(Number)
    }

    updateStar = (id) => {
        let message = this.state.messages.filter((message) => {return message.id === id})
        httpUpdateStar(id, message)
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

    
    updateReadOrUnread = (booleanValue) => {
        const noUndefinedIds = this.selectedMessages()
        httpUpdateReadOrUnread(noUndefinedIds, booleanValue)
        this.markAsReadOrUnread(booleanValue)
    }

    deleteSelectedMessages = () => {
        const newMessages = this.state.messages.filter((message) => {return !message.selected})
        this.setState({messages:newMessages})
    }

    httpDelete = () => {
        const noUndefinedIds = this.selectedMessages()
        httpDeleteMessage(noUndefinedIds)
        this.deleteSelectedMessages()
    }

    unreadMessageCount = () => {
        return this.state.messages.filter((message) => {return !message.read}).length
    }

    addLabelToSelected = (label) => {
        const messagesWithUpdatedLabel = this.state.messages.map((message) => {
            if (message.selected) { return { ...message, labels: [...new Set([...message.labels, label])] }}
            return message
        })
        
        this.setState({messages: messagesWithUpdatedLabel})
    }

    removeElementFromArray = (array, element) => {
        return array.filter((label) => {return label != element})
    }

    removeLabelOnSelected = (label) => {
        const messagesWithUpdatedLabel = this.state.messages.map((message) => {
            const updatedLabels = this.removeElementFromArray(message.labels, label)
            if (message.selected) { return { ...message, labels: updatedLabels } }
            return message
        })

        this.setState({ messages: messagesWithUpdatedLabel })
    }

    httpLabel = (e, type) => {
        const label = e.target.value 
        const noUndefinedIds = this.selectedMessages()
        httpLabel(noUndefinedIds, type, label)

        if (type == "addLabel") {return this.addLabelToSelected(label)}
        this.removeLabelOnSelected(label)
    }

    openForm = () => {
        this.setState((prevState) => ({
            formOpen: !prevState.formOpen
        }))
    }

    newMessage = (e) => {
        const subject = e.target.subject.value
        const body = e.target.body.value
        const id = this.state.messages.length + 1

        const newMessage = httpNewMessage(subject,body)
        this.setState((prevState) => ({
            messages: [...prevState.messages, newMessage]    
        }))
    }

    render(){
        
        return (
            <div>
                <Toolbar
                 selectedCount={this.selectedCount}
                 totalMessageCount={this.totalMessageCount}
                 selectDeselect={this.selectDeselect}
                 updateReadOrUnread={this.updateReadOrUnread}
                 httpDelete={this.httpDelete}
                 unreadMessageCount={this.unreadMessageCount()}
                 httpLabel={this.httpLabel}
                 openForm={this.openForm}
                 />

                 {this.state.formOpen ? <ComposeForm newMessage={this.newMessage}/> : null}

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


