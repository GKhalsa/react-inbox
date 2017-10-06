import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateStar, updateSelected, selectDeselect, markAsReadOrUnread,
         deleteSelectedMessages, addRemoveLabel, openForm } from '../actions/index.js'
import {Link, Switch, withRouter} from 'react-router-dom'

const Toolbar = ({
    selectDeselect,
    openForm,
    messages,
    markAsReadOrUnread,
    deleteSelectedMessages,
    addRemoveLabel,
    history
}) => {

    const selectedCount = () => {
        return messages.filter((message) => message.selected).length
    }

    const totalMessageCount = () => {
        return messages.length
    }

    const unreadMessageCount = () => {
        return messages.filter((message) => { return !message.read }).length
    }

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unreadMessageCount()}</span>
                    unread messages
                </p>


                <Link to={`${history.location.pathname == "/compose" ? "/" : "/compose"}`}>
                    <button className="btn btn-danger">
                        <i className="fa fa-plus"></i>
                    </button>
                </Link>

                <button className="btn btn-default" onClick={e => selectDeselect((selectedCount() === totalMessageCount()))}>
                    {selectedCount() === 0 ? <i className="fa fa-square-o"></i> : <i className={`fa ${selectedCount() === totalMessageCount() ? "fa-check-square-o" : "fa-minus-square-o"}`}></i>}
                </button>

                <button className="btn btn-default" onClick={e => markAsReadOrUnread(true, messages)}>
                    Mark As Read
                </button>

                <button className="btn btn-default" onClick={e => markAsReadOrUnread(false, messages)}>
                    Mark As Unread
                </button>

                <select className="form-control label-select" onChange={e => addRemoveLabel(e, "addLabel", messages)}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" onChange={e => addRemoveLabel(e, "removeLabel", messages)}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" onClick={e => { deleteSelectedMessages(messages)}}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    messages: state.messages.all
})


const mapDispatchToProps = dispatch => bindActionCreators({
    updateStar,
    updateSelected,
    selectDeselect,
    markAsReadOrUnread,
    deleteSelectedMessages,
    addRemoveLabel,
    openForm
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar))