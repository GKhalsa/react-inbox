import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {updateStar, updateSelected} from '../actions/index.js'

const Message = ({
    message,
    updateStar,
    updateSelected
}) => (
        <div className={`row message ${message.read ? "read" : "unread"} ${message.selected ? "selected" : ""}`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" checked={!!message.selected} onChange={e => updateSelected(message.id)}/>
                    </div>
                    <div className="col-xs-2" onClick={e => updateStar(message.id, message.starred)}>
                        {message.starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {message.labels.map((label, i) => {return <span key={i} className="label label-warning">{label}</span>})}

                <a href="#">
                    {message.subject}
            </a>
            </div>
        </div>
)

const mapStateToProps = (state) => ({
    messages: state.messages 
})

const mapDispatchToProps = dispatch => bindActionCreators({
    updateStar,
    updateSelected
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Message)