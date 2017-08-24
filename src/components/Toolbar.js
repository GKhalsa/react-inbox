import React from 'react'

const Toolbar = ({
    selectedCount,
    totalMessageCount,
    selectDeselect,
    markAsRead,
    markAsUnread
}) => (
    <div className="row toolbar">
        <div className="col-md-12">
            <p className="pull-right">
                <span className="badge badge">2</span>
                unread messages
            </p>

            <button className="btn btn-default" onClick={e => selectDeselect()}>
                {selectedCount() === 0 ? <i className="fa fa-square-o"></i> : <i className={`fa ${selectedCount() === totalMessageCount() ? "fa-check-square-o" : "fa-minus-square-o"}`}></i>}
            </button>

            <button className="btn btn-default" onClick={e => markAsRead()}>
                Mark As Read
            </button>

            <button className="btn btn-default" onClick={e => markAsUnread()}>
                Mark As Unread
            </button>

            <select className="form-control label-select" disabled="disabled">
                <option>Apply label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <select className="form-control label-select" disabled="disabled">
                <option>Remove label</option>
                <option value="dev">dev</option>
                <option value="personal">personal</option>
                <option value="gschool">gschool</option>
            </select>

            <button className="btn btn-default" disabled="disabled">
                <i className="fa fa-trash-o"></i>
            </button>
        </div>
    </div>
)

export default Toolbar