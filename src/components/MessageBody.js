import React from 'react'
import {getBody} from '../actions/index.js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MessageBody extends React.Component {

    componentWillMount(){
        this.props.getBody(this.props.match.path, this.props.id)
    }

    render(){
        return (
            <div className="row message-body">
                <div className="col-xs-11 col-xs-offset-1">
                    {this.props.body}
                </div>
            </div>
        )   
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        body: state.messages.currentBody
    }
    
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getBody
},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(MessageBody)