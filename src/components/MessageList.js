import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
import MessageSeeds from './messageSeeds'
import { connect } from 'react-redux'
import {httpUpdateStar, httpUpdateReadOrUnread, httpLabel, httpDeleteMessage, httpNewMessage} from './http'
import ComposeForm from './ComposeForm'
import {fetchMessages,updateStar} from '../actions/index.js'
import {bindActionCreators} from 'redux'

export class MessageList extends Component {

    state = {
        messages:[],
        formOpen: false
    }

    selectedMessages = () => {
        const ids = this.state.messages.map((message) => { if (message.selected) { return message.id } return })
        return ids.filter(Number)
    }

    // toggleAttribute = (id, attribute) => {
    //     const updatedMessages = this.state.messages.map((message) => {
    //         if(message.id === id){return {...message, [attribute]: !message[attribute]}}
    //         return message
    //     })
    //     this.setState({messages: updatedMessages}) 
    // }

    // selectedCount = () => {
    //     return this.props.messages.all.filter((message) => message.selected).length
    // }

    // totalMessageCount = () => {
    //     return this.props.messages.all.length
    // }

    // updateSelection = (booleanValue) => {
    //     return this.state.messages.map((message) => { return { ...message, selected: booleanValue } })
    // }

    // selectDeselect = () => {
    //     let newMessages;
    //     if (this.selectedCount() === this.totalMessageCount()) {
    //         newMessages = this.updateSelection(false)
    //     } else {
    //         newMessages = this.updateSelection(true)
    //     }       
      
    //     this.setState({ messages: newMessages })
    // }

    // markAsReadOrUnread = (booleanValue) => {
    //     const markedReadOrUnread = this.state.messages.map((message) => {if (message.selected) {return { ...message, read: booleanValue }}
    //         return message
    //     });
    //     this.setState({ messages: markedReadOrUnread })   
    // }

    
    // updateReadOrUnread = (booleanValue) => {
    //     const noUndefinedIds = this.selectedMessages()
    //     httpUpdateReadOrUnread(noUndefinedIds, booleanValue)
    //     this.markAsReadOrUnread(booleanValue)
    // }

    // deleteSelectedMessages = () => {
    //     const newMessages = this.state.messages.filter((message) => {return !message.selected})
    //     this.setState({messages:newMessages})
    // }

    // httpDelete = () => {
    //     const noUndefinedIds = this.selectedMessages()
    //     httpDeleteMessage(noUndefinedIds)
    //     this.deleteSelectedMessages()
    // }

    // unreadMessageCount = () => {
    //     return this.props.messages.all.filter((message) => {return !message.read}).length
    // }

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

    newMessage = async(e) => {
        const subject = e.target.subject.value
        const body = e.target.body.value
        const id = this.state.messages.length + 1

        const newMessage = await httpNewMessage(subject,body)
        this.setState((prevState) => ({
            messages: [...prevState.messages, newMessage],
            formOpen: false    
        }))
    }

    render(){
        return (
            <div>
                <Toolbar
                 httpLabel={this.httpLabel}
                 openForm={this.openForm}
                 />

                 {this.state.formOpen ? <ComposeForm newMessage={this.newMessage}/> : null}

                {this.props.messages.all.map((message,i) => <Message 
                                                         key={i} 
                                                         message={message}
                                                         />) }
            </div>
        )

    }
}

const mapStateToProps = state => ({
    messages: state.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchMessages
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)