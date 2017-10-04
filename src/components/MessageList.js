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
                //  httpLabel={this.httpLabel}
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