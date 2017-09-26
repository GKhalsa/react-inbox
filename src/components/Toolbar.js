import React from 'react'

const Toolbar = ({
    selectedCount,
    totalMessageCount,
    selectDeselect,
    httpDelete,
    unreadMessageCount,
    httpLabel,
    updateReadOrUnread,
    openForm
}) => (
    <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">{unreadMessageCount}</span>
                unread messages
            </p>

            <button className="btn btn-danger" onClick={e => openForm()}>
                <i className="fa fa-plus"></i>
            </button>

            <button className="btn btn-default" onClick={e => selectDeselect()}>
                {selectedCount() === 0 ? <i className="fa fa-square-o"></i> : <i className={`fa ${selectedCount() === totalMessageCount() ? "fa-check-square-o" : "fa-minus-square-o"}`}></i>}
            </button>

            <button className="btn btn-default" onClick={e => updateReadOrUnread(true)}>
                Mark As Read
            </button>

            <button className="btn btn-default" onClick={e => updateReadOrUnread(false)}>
                Mark As Unread
            </button>

            <select className="form-control label-select" onChange={e => httpLabel(e, "addLabel")}>
                <option>Apply label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" onChange={e => httpLabel(e, "removeLabel")}>
                <option>Remove label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" onClick={e => { httpDelete()}}>
                <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
)

export default Toolbar