import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
import MessageSeeds from './messageSeeds'
import ComposeForm from './ComposeForm'
import {fetchMessages,updateStar} from '../actions/index.js'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

const MessageList = ({messages, formOpen}) => (
  
    <div>
        <Toolbar/>
        {formOpen ? <ComposeForm/> : null}
        {messages.all.map((message,i) => <Message 
                                                    key={i} 
                                                    message={message}
                                                    />) }
   </div>

)

const mapStateToProps = state => ({
    messages: state.messages,
    formOpen: state.messages.formOpen
})

export default connect(mapStateToProps, null)(MessageList)