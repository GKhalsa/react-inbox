import React, {Component} from 'react'
import Message from './Message'
import Toolbar from './Toolbar'
import ComposeForm from './ComposeForm'
import {fetchMessages,updateStar} from '../actions/index.js'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

const MessageList = ({messages, formOpen}) => (
  
    <Router>
        <div>
            <Toolbar/>
            <Route path="/compose" component={ComposeForm}/>
            {messages.all.map((message,i) => <Message key={i}   message={message}/>) }
        </div>
   </Router>

)

const mapStateToProps = state => ({
    messages: state.messages,
    formOpen: state.messages.formOpen
})

export default connect(mapStateToProps, null)(MessageList)