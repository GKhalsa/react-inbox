import React from 'react'

const Message = ({
    id,
    subject,
    starred,
    toggleStarring,
    toggleSelect,
    selected,
    read,
    labels
}) => (
    <div className={`row message ${read ? "read" : "unread"} ${selected ? "selected" : ""}`}>
        <div className="col-xs-1">
            <div className="row">
                <div className="col-xs-2">
                    <input type="checkbox" checked={!!selected} onClick={e => toggleSelect(id)}/>
                </div>
                <div className="col-xs-2" onClick={e => toggleStarring(id)}>
                    {starred ? <i className="star fa fa-star"></i> : <i className="star fa fa-star-o"></i>}
                </div>
            </div>
        </div>
        <div className="col-xs-11">
            {labels.map((label) => {return <span className="label label-warning">{label}</span>})}

            <a href="#">
                {subject}
        </a>
        </div>
     </div>
)

export default Message

//TODO: all the toggles can be same function just pass param to toggle