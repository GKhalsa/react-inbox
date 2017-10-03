import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {updateStar, updateSelected} from '../actions/index.js'

const Message = ({
    id,
    subject,
    starred,
    toggleAttribute,
    selected,
    read,
    labels,
    updateStar,
    updateSelected
}) => (
        <div className={`row message ${read ? "read" : "unread"} ${selected ? "selected" : ""}`}>
            <div className="col-xs-1">
                <div className="row">
                    <div className="col-xs-2">
                        <input type="checkbox" checked={!!selected} onChange={e => updateSelected(id)}/>
                    </div>
                    <div className="col-xs-2" onClick={e => updateStar(id, starred)}>
                        {starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
                    </div>
                </div>
            </div>
            <div className="col-xs-11">
                {labels.map((label, i) => {return <span key={i} className="label label-warning">{label}</span>})}

                <a href="#">
                    {subject}
            </a>
            </div>
        </div>
)

const mapStateToProps = state => ({
    messages: state.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
    updateStar,
    updateSelected
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Message)